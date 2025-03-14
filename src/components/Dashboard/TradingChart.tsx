
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts";
import { api, type ChartData } from "@/lib/api";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = date.toLocaleString();
    const price = typeof payload[0].value === 'number' ? payload[0].value.toFixed(2) : payload[0].value;
    
    return (
      <div className="custom-tooltip bg-background p-3 border border-border rounded-md shadow-md">
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
        <p className="font-semibold">${price}</p>
      </div>
    );
  }

  return null;
};

const TradingChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1D"); // 1D, 1W, 1M, 1Y, ALL

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        const data = await api.getChartData("AAPL");
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch chart data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await api.getChartData("AAPL");
      setChartData(data);
    } catch (error) {
      console.error("Failed to refresh chart data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const data = chartData?.data || [];
  const currentPrice = chartData?.current || 0;
  const change = chartData?.change || 0;
  const changePercent = chartData?.changePercent || 0;

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Apple Inc. (AAPL)
          </CardTitle>
          <CardDescription>
            Real-time stock prices and trends
          </CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="space-x-2">
            <span className="text-2xl font-bold">${currentPrice?.toFixed(2) || <Skeleton className="h-6 w-12" />}</span>
            <Badge variant={change > 0 ? "default" : "destructive"}>
              {change > 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {change?.toFixed(2) || <Skeleton className="h-4 w-8" />} ({changePercent?.toFixed(2)}%)
            </Badge>
          </div>
        </div>
        <div className="h-[250px] w-full">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} hide />
                <YAxis tickFormatter={(price) => price.toFixed(2)} domain={['dataMin', 'dataMax']}  />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fill="url(#colorPrice)" />
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChart;
