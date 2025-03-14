
// Mock financial data API

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high24h: number;
  low24h: number;
  type: 'stock' | 'crypto';
};

export type Portfolio = {
  id: string;
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  assets: PortfolioAsset[];
};

export type PortfolioAsset = {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
};

export type MarketOverview = {
  marketIndex: {
    sp500: { value: number; change: number; changePercent: number; };
    nasdaq: { value: number; change: number; changePercent: number; };
    dowJones: { value: number; change: number; changePercent: number; };
  };
  trendingAssets: Asset[];
  topGainers: Asset[];
  topLosers: Asset[];
};

// Mock data
const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.63,
    change: 3.42,
    changePercent: 1.91,
    volume: 62345678,
    marketCap: 2790000000000,
    high24h: 183.12,
    low24h: 179.21,
    type: 'stock'
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 415.28,
    change: 5.23,
    changePercent: 1.28,
    volume: 25678123,
    marketCap: 3100000000000,
    high24h: 416.45,
    low24h: 410.05,
    type: 'stock'
  },
  {
    id: '3',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.12,
    change: -2.34,
    changePercent: -1.30,
    volume: 32145678,
    marketCap: 1890000000000,
    high24h: 181.45,
    low24h: 177.89,
    type: 'stock'
  },
  {
    id: '4',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 149.53,
    change: 0.89,
    changePercent: 0.60,
    volume: 18923456,
    marketCap: 1870000000000,
    high24h: 150.12,
    low24h: 148.64,
    type: 'stock'
  },
  {
    id: '5',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 61245.78,
    change: 1245.32,
    changePercent: 2.08,
    volume: 38765432123,
    marketCap: 1210000000000,
    high24h: 61890.45,
    low24h: 60123.78,
    type: 'crypto'
  },
  {
    id: '6',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3254.12,
    change: -45.32,
    changePercent: -1.37,
    volume: 19876543210,
    marketCap: 392000000000,
    high24h: 3310.45,
    low24h: 3245.67,
    type: 'crypto'
  },
  {
    id: '7',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 175.34,
    change: -4.21,
    changePercent: -2.35,
    volume: 45678912,
    marketCap: 556000000000,
    high24h: 180.12,
    low24h: 174.89,
    type: 'stock'
  },
  {
    id: '8',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 887.45,
    change: 21.34,
    changePercent: 2.46,
    volume: 35678123,
    marketCap: 2190000000000,
    high24h: 890.23,
    low24h: 865.12,
    type: 'stock'
  }
];

// Mock portfolio data
const mockPortfolio: Portfolio = {
  id: '1',
  totalValue: 125789.23,
  totalChange: 3456.78,
  totalChangePercent: 2.83,
  assets: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 150,
      averagePrice: 170.42,
      currentPrice: 182.63,
      totalValue: 27394.50,
      totalChange: 1831.50,
      totalChangePercent: 7.16
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      quantity: 65,
      averagePrice: 398.12,
      currentPrice: 415.28,
      totalValue: 26993.20,
      totalChange: 1115.40,
      totalChangePercent: 4.31
    },
    {
      id: '5',
      symbol: 'BTC',
      name: 'Bitcoin',
      quantity: 0.75,
      averagePrice: 58745.32,
      currentPrice: 61245.78,
      totalValue: 45934.34,
      totalChange: 1875.35,
      totalChangePercent: 4.26
    },
    {
      id: '8',
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      quantity: 28,
      averagePrice: 850.12,
      currentPrice: 887.45,
      totalValue: 24848.60,
      totalChange: 1045.24,
      totalChangePercent: 4.38
    }
  ]
};

// Mock market overview
const mockMarketOverview: MarketOverview = {
  marketIndex: {
    sp500: { value: 5218.21, change: 32.45, changePercent: 0.63 },
    nasdaq: { value: 16389.45, change: 145.32, changePercent: 0.89 },
    dowJones: { value: 39356.56, change: 123.45, changePercent: 0.31 }
  },
  trendingAssets: mockAssets.slice(0, 4),
  topGainers: mockAssets.filter(asset => asset.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 3),
  topLosers: mockAssets.filter(asset => asset.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent).slice(0, 3)
};

// Simulated stock prices with time series data
export type PricePoint = {
  timestamp: number;
  price: number;
};

export type ChartData = {
  symbol: string;
  name: string;
  data: PricePoint[];
  change: number;
  changePercent: number;
  current: number;
  high: number;
  low: number;
  open: number;
  volume: number;
};

const generateTimeSeriesData = (
  basePrice: number,
  volatility: number,
  dataPoints: number = 100,
  hoursBack: number = 24
): PricePoint[] => {
  const now = new Date();
  const data: PricePoint[] = [];
  
  let price = basePrice;
  const msPerPoint = (hoursBack * 60 * 60 * 1000) / dataPoints;
  
  for (let i = 0; i < dataPoints; i++) {
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(price + change, 0.01); // prevent negative prices
    
    const timestamp = now.getTime() - (dataPoints - i) * msPerPoint;
    data.push({ timestamp, price });
  }
  
  return data;
};

const mockChartData: Record<string, ChartData> = {};

// Generate chart data for all assets
mockAssets.forEach(asset => {
  const data = generateTimeSeriesData(
    asset.price * 0.95,
    asset.price * 0.01,
    150,
    24
  );
  
  const firstPoint = data[0].price;
  const lastPoint = data[data.length - 1].price;
  const change = lastPoint - firstPoint;
  const changePercent = (change / firstPoint) * 100;
  
  mockChartData[asset.symbol] = {
    symbol: asset.symbol,
    name: asset.name,
    data,
    change,
    changePercent,
    current: lastPoint,
    high: Math.max(...data.map(d => d.price)),
    low: Math.min(...data.map(d => d.price)),
    open: firstPoint,
    volume: asset.volume
  };
});

// API functions
export const api = {
  getAssets: async (): Promise<Asset[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockAssets];
  },

  getAssetDetail: async (symbol: string): Promise<Asset | null> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAssets.find(asset => asset.symbol === symbol) || null;
  },

  getPortfolio: async (): Promise<Portfolio> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...mockPortfolio };
  },

  getMarketOverview: async (): Promise<MarketOverview> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockMarketOverview };
  },

  getChartData: async (symbol: string): Promise<ChartData | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockChartData[symbol] || null;
  },

  getMultipleChartData: async (symbols: string[]): Promise<Record<string, ChartData>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return symbols.reduce((acc, symbol) => {
      if (mockChartData[symbol]) {
        acc[symbol] = mockChartData[symbol];
      }
      return acc;
    }, {} as Record<string, ChartData>);
  }
};
