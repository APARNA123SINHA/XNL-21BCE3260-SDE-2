
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, MarketOverview as MarketOverviewType, Asset } from "@/lib/api";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, BarChart, ArrowRight } from "lucide-react";

const MarketOverview = () => {
  const [marketData, setMarketData] = useState<MarketOverviewType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await api.getMarketOverview();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching market overview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="glass-card shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {marketData && (
                <>
                  <IndexCard
                    name="S&P 500"
                    value={marketData.marketIndex.sp500.value}
                    change={marketData.marketIndex.sp500.change}
                    changePercent={marketData.marketIndex.sp500.changePercent}
                    delay={0}
                  />
                  <IndexCard
                    name="NASDAQ"
                    value={marketData.marketIndex.nasdaq.value}
                    change={marketData.marketIndex.nasdaq.change}
                    changePercent={marketData.marketIndex.nasdaq.changePercent}
                    delay={0.1}
                  />
                  <IndexCard
                    name="Dow Jones"
                    value={marketData.marketIndex.dowJones.value}
                    change={marketData.marketIndex.dowJones.change}
                    changePercent={marketData.marketIndex.dowJones.changePercent}
                    delay={0.2}
                  />
                </>
              )}
            </div>

            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
              
              {marketData && (
                <>
                  <TabsContent value="trending" className="mt-0">
                    <AssetList assets={marketData.trendingAssets} />
                  </TabsContent>
                  <TabsContent value="gainers" className="mt-0">
                    <AssetList assets={marketData.topGainers} />
                  </TabsContent>
                  <TabsContent value="losers" className="mt-0">
                    <AssetList assets={marketData.topLosers} />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface IndexCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  delay: number;
}

const IndexCard = ({ name, value, change, changePercent, delay }: IndexCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-secondary/50 backdrop-blur-sm rounded-lg p-3"
    >
      <div className="text-sm text-muted-foreground mb-1">{name}</div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-semibold">
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <div
          className={`flex items-center text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3 mr-1" />
          ) : (
            <ArrowDownRight className="w-3 h-3 mr-1" />
          )}
          <span>
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const AssetList = ({ assets }: { assets: Asset[] }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {assets.map(asset => (
        <motion.div
          key={asset.id}
          variants={item}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-xs font-semibold text-primary">
                {asset.symbol.substring(0, 2)}
              </span>
            </div>
            <div>
              <div className="font-medium">{asset.symbol}</div>
              <div className="text-xs text-muted-foreground">{asset.name}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold">
              ${asset.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
            <div
              className={`text-xs font-medium flex items-center ${
                asset.change >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {asset.change >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              )}
              {asset.changePercent.toFixed(2)}%
            </div>
          </div>
        </motion.div>
      ))}
      <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">
        <span>View all markets</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="bg-secondary/50 rounded-lg p-3 h-[76px]"
          ></div>
        ))}
      </div>
      <div className="h-8 bg-secondary/50 rounded mb-4 w-full"></div>
      <div className="space-y-2">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-secondary/80 mr-3"></div>
              <div>
                <div className="h-4 bg-secondary/80 rounded w-16 mb-1"></div>
                <div className="h-3 bg-secondary/60 rounded w-24"></div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-4 bg-secondary/80 rounded w-16 mb-1"></div>
              <div className="h-3 bg-secondary/60 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
