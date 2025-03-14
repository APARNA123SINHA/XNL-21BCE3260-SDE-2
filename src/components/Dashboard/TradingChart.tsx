
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api, ChartData, PricePoint } from "@/lib/api";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { BarChart3, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const timeRanges = [
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "1Y", label: "1Y" },
  { value: "ALL", label: "ALL" },
];

const TradingChart = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [timeRange, setTimeRange] = useState("1D");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchChartData = async () => {
    try {
      setIsLoading(true);
      const data = await api.getChartData(selectedStock);
      setChartData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedStock]);

  const handleRefresh = () => {
    fetchChartData();
  };

  // Format data for the chart
  const formatChartData = (data: PricePoint[] | undefined) => {
    if (!data) return [];

    // Filter data based on time range
    let filteredData = [...data];
    const now = new Date();
    
    switch (timeRange) {
      case "1D":
        // All data (already 24h in our mock)
        break;
      case "1W":
        // Filter to last 7 days worth of data
        filteredData = filteredData.filter(d => 
          (now.getTime() - d.timestamp) < 7 * 24 * 60 * 60 * 1000
        );
        break;
      // Add other cases as needed
    }

    return filteredData.map(point => ({
      timestamp: point.timestamp,
      price: point.price,
      // Format the timestamp for display
      time: new Date(point.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }));
  };

  const formattedData = formatChartData(chartData?.data);
  const isPositiveChange = chartData && chartData.change >= 0;
  const changeColor = isPositiveChange ? "text-green-600" : "text-red-500";
  const lineColor = isPositiveChange ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)";

  return (
    <Card className="glass-card shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>Trading Chart</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="w-[100px] h-8 text-sm">
                <SelectValue placeholder="Select stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="MSFT">MSFT</SelectItem>
                <SelectItem value="GOOGL">GOOGL</SelectItem>
                <SelectItem value="AMZN">AMZN</SelectItem>
                <SelectItem value="TSLA">TSLA</SelectItem>
                <SelectItem value="NVDA">NVDA</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          chartData && (
            <>
              <div className="mb-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="text-2xl font-bold">
                    ${chartData.current.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className={`flex items-center text-sm font-medium ${changeColor}`}>
                    {isPositiveChange ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {chartData.change.toFixed(2)} ({chartData.changePercent.toFixed(2)}%)
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {chartData.name}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex space-x-1 mb-6">
                  {timeRanges.map((range) => (
                    <button
                      key={range.value}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        timeRange === range.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setTimeRange(range.value)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                        minTickGap={50}
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        width={40}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                      />
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke="var(--border)"
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover/90 backdrop-blur-sm border border-border p-2 rounded-md shadow-sm">
                                <p className="text-xs text-muted-foreground">{new Date(payload[0].payload.timestamp).toLocaleString()}</p>
                                <p className="text-sm font-semibold">${payload[0].value?.toFixed(2)}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={lineColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="bg-secondary/40 backdrop-blur-xs rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Open</div>
                  <div className="text-sm font-medium">
                    ${chartData.open.toFixed(2)}
                  </div>
                </div>
                <div className="bg-secondary/40 backdrop-blur-xs rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">High</div>
                  <div className="text-sm font-medium">
                    ${chartData.high.toFixed(2)}
                  </div>
                </div>
                <div className="bg-secondary/40 backdrop-blur-xs rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Low</div>
                  <div className="text-sm font-medium">
                    ${chartData.low.toFixed(2)}
                  </div>
                </div>
                <div className="bg-secondary/40 backdrop-blur-xs rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Volume</div>
                  <div className="text-sm font-medium">
                    {(chartData.volume / 1000000).toFixed(2)}M
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <Button className="rounded-full px-6 bg-green-600 hover:bg-green-700">
                  Buy
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950">
                  Sell
                </Button>
              </div>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-4">
        <div className="flex items-baseline gap-3">
          <div className="h-8 bg-secondary/80 rounded w-32"></div>
          <div className="h-4 bg-secondary/60 rounded w-24"></div>
        </div>
        <div className="h-4 bg-secondary/60 rounded w-40 mt-1"></div>
      </div>

      <div className="flex space-x-1 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-7 bg-secondary/60 rounded-full w-10"></div>
        ))}
      </div>

      <div className="h-[300px] bg-secondary/30 rounded mb-6"></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-secondary/40 rounded-lg p-2 h-[52px]"></div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <div className="h-10 bg-secondary/80 rounded-full w-24"></div>
        <div className="h-10 bg-secondary/60 rounded-full w-24"></div>
      </div>
    </div>
  );
};

export default TradingChart;
