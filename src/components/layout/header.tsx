"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, BarChart3 } from "lucide-react";
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <TrendingUp className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">PortfolioX</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              Portfolio
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/analytics"
            >
              Analytics
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/transactions"
            >
              Transactions
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="hidden sm:flex">
              <BarChart3 className="mr-1 h-3 w-3" />
              Live Data
            </Badge>
            <Button size="sm">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
