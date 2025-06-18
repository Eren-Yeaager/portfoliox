import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { ChainPortfolio } from "@/components/portfolio/chain-portfolio";

// Mock data
const mockPortfolioData = {
  totalValue: 125430.5,
  change24h: 2340.75,
  changePercent: 1.89,
  totalTokens: 12,
};

const mockChains = [
  {
    chain: "ethereum",
    chainName: "Ethereum",
    totalValue: 45620.3,
    color: "#627EEA",
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: 12.5,
        value: 45620.3,
        price: 3649.62,
        change24h: 2.1,
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 5000,
        value: 5000,
        price: 1.0,
        change24h: 0,
      },
    ],
  },
  {
    chain: "bsc",
    chainName: "Binance Smart Chain",
    totalValue: 23410.2,
    color: "#F3BA2F",
    tokens: [
      {
        symbol: "BNB",
        name: "Binance Coin",
        balance: 8.2,
        value: 23410.2,
        price: 2854.9,
        change24h: 1.5,
      },
    ],
  },
  {
    chain: "polygon",
    chainName: "Polygon",
    totalValue: 15680.0,
    color: "#8247E5",
    tokens: [
      {
        symbol: "MATIC",
        name: "Polygon",
        balance: 15000,
        value: 15680.0,
        price: 1.05,
        change24h: -0.8,
      },
    ],
  },
  {
    chain: "arbitrum",
    chainName: "Arbitrum",
    totalValue: 40720.0,
    color: "#28A0F0",
    tokens: [
      {
        symbol: "ARB",
        name: "Arbitrum",
        balance: 20000,
        value: 40720.0,
        price: 2.04,
        change24h: 3.2,
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Portfolio Overview
        </h1>
        <p className="text-muted-foreground">
          Track your crypto assets across multiple blockchains
        </p>
      </div>

      <PortfolioSummary {...mockPortfolioData} />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Chain Breakdown
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockChains.map((chain) => (
            <ChainPortfolio key={chain.chain} {...chain} />
          ))}
        </div>
      </div>
    </div>
  );
}
