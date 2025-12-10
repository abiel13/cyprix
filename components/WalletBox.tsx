"use client";

import { useState, useEffect } from "react";
import {
  BlockchainId,
  SUPPORTED_BLOCKCHAINS,
  getWalletForChain
} from "@/src/config/wallet";
import { FundButton } from '@coinbase/onchainkit/fund';


// Map blockchain IDs to network names for the API
const CHAIN_TO_NETWORK: Record<BlockchainId, string> = {
  ethereum: "ethereum",
  bitcoin: "bitcoin",
  cardano: "cardano",
  solana: "solana",
  xrp: "xrp",
  base: "base",
  polygon: "polygon"
};

// Map blockchain IDs to asset names
const CHAIN_TO_ASSET: Record<BlockchainId, string> = {
  ethereum: "USDC",
  bitcoin: "BTC",
  cardano: "ADA",
  solana: "SOL",
  xrp: "XRP",
  base: "USDC",
  polygon: "USDC"
};

export default function WalletBox() {
  const [selectedChain, setSelectedChain] =
    useState<BlockchainId>("ethereum");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const address = getWalletForChain(selectedChain);

  // Fetch session token when component mounts or when chain changes
  const fetchSessionToken = async () => {
    // If we already have a session token, don't fetch again
    if (sessionToken) {
      return;
    }

    if (!address) {
      setError("No wallet address configured for this chain");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/onramp/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          network: CHAIN_TO_NETWORK[selectedChain],
          assets: [CHAIN_TO_ASSET[selectedChain]], // Session Token API expects assets as array
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create session");
      }

      const data = await response.json();

      // Set the session token for FundButton
      const token = data.sessionToken || data.clientSecret;
      if (token) {
        setSessionToken(token);
      }
    } catch (err: any) {
      console.error("Error creating onramp session:", err);
      setError(err.message || "Failed to create onramp session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      className="
        fixed right-4 top-4 z-40 w-[290px]
        rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4
        shadow-xl shadow-black/50 backdrop-blur-xl
        transition-transform duration-300 hover:-translate-y-1
        md:right-6 md:top-6
      "
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Site Wallet
          </p>
          <p className="text-xs font-semibold text-slate-100">Crypix Treasury</p>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          Onramp Ready
        </span>
      </div>

      <label className="mt-3 block text-[11px] text-slate-400">
        Network
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value as BlockchainId)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {SUPPORTED_BLOCKCHAINS.map((chain) => (
            <option key={chain} value={chain} className="text-black">
              {chain.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3">
        <p className="text-[11px] text-slate-400">Receiving address</p>
        <p className="mt-1 rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-slate-100 break-all">
          {address ?? "No wallet configured for this chain"}
        </p>
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-2 py-1.5 text-[10px] text-red-300">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-3 rounded-lg border border-purple-500/40 bg-purple-500/10 px-2 py-1.5 text-[10px] text-purple-300 flex items-center gap-2">
          <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating session...
        </div>
      )}

      <div className="mt-3">
        <FundButton sessionToken={sessionToken || undefined} />
      </div>
    </aside>
  );
}
