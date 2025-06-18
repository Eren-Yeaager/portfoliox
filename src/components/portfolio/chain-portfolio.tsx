import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingUp } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
}

interface ChainPortfolioProps {
  chain: string;
  chainName: string;
  totalValue: number;
  tokens: Token[];
  color: string;
}

const chainIcons: Record<string, React.ReactNode> = {
  ethereum: <Coins className="h-4 w-4" />,
  bsc: <Coins className="h-4 w-4" />,
  polygon: <Coins className="h-4 w-4" />,
  arbitrum: <Coins className="h-4 w-4" />,
};

export function ChainPortfolio({
  chain,
  chainName,
  totalValue,
  tokens,
  color,
}: ChainPortfolioProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {chainIcons[chain]}
          <span>{chainName}</span>
          <Badge variant="outline" style={{ borderColor: color, color }}>
            {tokens.length} tokens
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Value</span>
          <span className="text-lg font-bold">
            ${totalValue.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          {tokens.map((token, index) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-2 rounded-lg border"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {token.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  ${token.value.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {token.balance.toFixed(4)} {token.symbol}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
