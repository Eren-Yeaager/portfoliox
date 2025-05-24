import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Web3Provider } from "@/components/providers/web3-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainIQ - AI-Powered DeFi Analytics",
  description: "Advanced DeFi analytics and trading platform powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
