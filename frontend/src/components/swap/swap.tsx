"use client";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Card, Title, Button, TextInput, Text } from "@tremor/react";
import { formatEther, fromBlobs } from "viem";

const COMMON_TOKENS = [
  {
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    symbol: "ETH",
    decimals: 18,
    name: "Ethereum",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    name: "DAI Stablecoin",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
  },
];

export default function Swap() {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState(COMMON_TOKENS[0]);
  const [toToken, setToToken] = useState(COMMON_TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: fromBalance } = useBalance({
    address,
    token: fromToken.address as `0x${string}`,
  });

  const { data: toBalance } = useBalance({
    address,
    token: toToken.address as `0x${string}`,
  });

  const handleSwap = async () => {
    if (!amount || !address) return;
    setIsLoading(true);
    try {
      //Will implement the swap logic here
      console.log(
        `Swapping ${amount} ${fromToken.symbol} to ${toToken.symbol}`
      );
    } catch (err) {
      console.error("Swap failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  if (!address) {
    return (
      <Card>
        <Text>Please connect your wallet to use the swap feature</Text>
      </Card>
    );
  }
  return (
    <Card className="max-w-md mx-auto">
      <Title>Swap Tokens</Title>
      <div className="mt-4 space-y-4">
        <div>
          <Text>From</Text>
          <div className="flex gap-2 mt-1">
            <TextInput
              placeholder="0.0"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="flex-1"
            />
            <select
              value={fromToken.address}
              onChange={(e) => {
                const token = COMMON_TOKENS.find(
                  (t) => t.address === e.target.value
                );
                if (token) setFromToken(token);
              }}
              className="px-3 py-2 border rounded-lg"
            >
              {COMMON_TOKENS.map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          <Text>
            Balance : {fromBalance ? formatEther(fromBalance.value) : "0"}{" "}
            {fromToken.symbol}
          </Text>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFromToken(toToken);
              setToToken(fromToken);
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ↓↑
          </button>
        </div>
        <div>
          <Text>To</Text>
          <div className="flex gap-2 mt-1">
            <TextInput
              placeholder="0.0"
              value={amount ? (Number(amount) * 1.1).toFixed(6) : ""}
              disabled
              className="flex-1"
            />
            <select
              value={toToken.address}
              onChange={(e) => {
                const token = COMMON_TOKENS.find(
                  (t) => t.address === e.target.value
                );
                if (token) setToToken(token);
              }}
              className="px-3 py-2 border rounded-lg"
            >
              {COMMON_TOKENS.map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          <Text className="text-sm text-gray-500 mt-1">
            Balance: {toBalance ? formatEther(toBalance.value) : "0"}{" "}
            {toToken.symbol}
          </Text>
        </div>
        <Button
          className="w-full"
          onClick={handleSwap}
          loading={isLoading}
          disabled={!amount || Number(amount) <= 0}
        >
          Swap
        </Button>
      </div>
    </Card>
  );
}
