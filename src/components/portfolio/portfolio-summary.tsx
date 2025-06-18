import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Coins } from "lucide-react";

interface PortfolioSummaryProps {
  totalValue: number;
  change24h: number;
  changePercent: number;
  totalTokens: number;
}

export function PortfolioSummary({
  totalValue,
  change24h,
  changePercent,
  totalTokens,
}: PortfolioSummaryProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalValue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {isPositive ? "+" : ""}${change24h.toLocaleString()} (
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Change</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}${change24h.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}% from yesterday
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTokens}</div>
          <p className="text-xs text-muted-foreground">Across all chains</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
          <Badge variant="secondary">Live</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Connected</div>
          <p className="text-xs text-muted-foreground">Wallet connected</p>
        </CardContent>
      </Card>
    </div>
  );
}
