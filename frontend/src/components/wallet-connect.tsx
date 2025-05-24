"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

export function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
    disconnect();
    return () => disconnect();
  }, [disconnect]);

  const handleConnect = async () => {
    try {
      const rabbyConnector = connectors.find(
        (connector) => connector.name === "Rabby"
      );
      if (rabbyConnector) {
        await disconnect();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await connect({ connector: rabbyConnector });
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  if (!mounted) return null;

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        onClick={handleConnect}
        disabled={isPending}
      >
        {isPending ? "Connecting..." : "Connect Rabby"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
}
