
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api, Portfolio, PortfolioAsset } from "@/lib/api";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from "recharts";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet, Eye, EyeOff } from "lucide-react";

const PortfolioSummary = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValueHidden, setIsValueHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await api.getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleValueVisibility = () => {
    setIsValueHidden(!isValueHidden);
  };

  // Generate chart data from portfolio assets
  const chartData = portfolio?.assets.map((asset) => ({
    name: asset.symbol,
    value: asset.totalValue,
  }));

  return (
    <Card className="glass-card shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span>Portfolio</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleValueVisibility}
          >
            {isValueHidden ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          portfolio && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-end justify-between mb-1">
                  <div className="text-sm text-muted-foreground">
                    Total Value
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center ${
                      portfolio.totalChange >= 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {portfolio.totalChange >= 0 ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {portfolio.totalChangePercent.toFixed(2)}% today
                  </div>
                </div>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold">
                    {isValueHidden
                      ? "••••••"
                      : `$${portfolio.totalValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </div>
                  <div
                    className={`ml-2 text-sm font-medium ${
                      portfolio.totalChange >= 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {isValueHidden
                      ? "•••"
                      : `${
                          portfolio.totalChange >= 0 ? "+" : ""
                        }$${portfolio.totalChange.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </div>
                </div>
              </motion.div>

              <div className="h-[150px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-popover/80 backdrop-blur-sm border border-border p-2 rounded-md shadow-sm text-xs">
                              <p className="font-semibold">{`${payload[0].payload.name}`}</p>
                              <p className="text-primary">{`Value: ${
                                isValueHidden
                                  ? "••••••"
                                  : `$${payload[0].value?.toLocaleString(
                                      undefined,
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }
                                    )}`
                              }`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 2,
                        r: 4,
                        fill: "hsl(var(--card))",
                      }}
                      activeDot={{
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 2,
                        r: 6,
                        fill: "hsl(var(--primary))",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-2">Holdings</h3>
                {portfolio.assets.map((asset, index) => (
                  <AssetItem
                    key={asset.id}
                    asset={asset}
                    isValueHidden={isValueHidden}
                    index={index}
                  />
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button className="rounded-full px-6">
                  Manage Portfolio
                </Button>
              </div>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};

interface AssetItemProps {
  asset: PortfolioAsset;
  isValueHidden: boolean;
  index: number;
}

const AssetItem = ({ asset, isValueHidden, index }: AssetItemProps) => {
  const percentage =
    (asset.totalValue / 125789.23) * 100; // hardcoded total from the mock data

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors relative"
    >
      <div
        className="absolute top-0 left-0 bottom-0 bg-primary/5"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="flex items-center z-10">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <span className="text-xs font-semibold text-primary">
            {asset.symbol.substring(0, 2)}
          </span>
        </div>
        <div>
          <div className="font-medium text-sm">{asset.symbol}</div>
          <div className="text-xs text-muted-foreground">
            {asset.quantity} shares
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end z-10">
        <div className="font-medium text-sm">
          {isValueHidden
            ? "••••••"
            : `$${asset.totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </div>
        <div
          className={`text-xs font-medium flex items-center ${
            asset.totalChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {asset.totalChange >= 0 ? (
            <ArrowUpRight className="w-3 h-3 mr-1" />
          ) : (
            <ArrowDownRight className="w-3 h-3 mr-1" />
          )}
          {asset.totalChangePercent.toFixed(2)}%
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="flex items-end justify-between mb-1">
          <div className="h-4 bg-secondary/80 rounded w-20"></div>
          <div className="h-3 bg-secondary/60 rounded w-24"></div>
        </div>
        <div className="flex items-baseline">
          <div className="h-8 bg-secondary/80 rounded w-40"></div>
          <div className="ml-2 h-4 bg-secondary/60 rounded w-16"></div>
        </div>
      </div>

      <div className="h-[150px] bg-secondary/30 rounded mb-6"></div>

      <div className="space-y-2">
        <h3 className="h-4 bg-secondary/80 rounded w-16 mb-4"></h3>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-secondary/80 mr-3"></div>
              <div>
                <div className="h-4 bg-secondary/80 rounded w-12 mb-1"></div>
                <div className="h-3 bg-secondary/60 rounded w-20"></div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-4 bg-secondary/80 rounded w-16 mb-1"></div>
              <div className="h-3 bg-secondary/60 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="h-10 bg-secondary/80 rounded-full w-40"></div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
