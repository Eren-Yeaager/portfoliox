"use client";
import { useAccount, useBalance } from "wagmi";
import { Card, Title, Text } from "@tremor/react";
import { formatEther } from "viem";
import Swap from "../swap/Swap";
export default function Dashboard() {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  if (!address) {
    return (
      <div className="p-4">
        <Text>Please connect your wallet to view the dashboard</Text>
      </div>
    );
  }

  const formattedBalance = balance ? formatEther(balance.value) : "0";
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <Title>Total Balance</Title>
          <Text className="mt-2">
            {isLoading
              ? "Loading..."
              : `${formattedBalance} ${balance?.symbol}`}
          </Text>
        </Card>
        <Card>
          <Title>Portfolio Value</Title>
          <Text className="mt-2">Coming soon...</Text>
        </Card>
        <Card>
          <Title>24h Change</Title>
          <Text className="mt-2">Coming soon...</Text>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <Title>Recent Activity</Title>
          <Text className="mt-2">No recent activity</Text>
        </Card>
        <Swap />
      </div>
    </div>
  );
}
