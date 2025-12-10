import type { BlockchainId } from "@/src/config/wallet";

const BASE_URL = process.env.NEXT_PUBLIC_COINBASE_ONRAMP_URL!;
const APP_ID = process.env.NEXT_PUBLIC_COINBASE_APP_ID!;

console.log(BASE_URL,APP_ID);

const CHAIN_TO_ASSET: Record<BlockchainId, string> = {
  ethereum: "ETH",
  bitcoin: "BTC",
  cardano: "ADA",
  solana: "SOL",
  xrp: "XRP",
  base: "ETH",
  polygon: "MATIC"
};

export function buildOnrampUrl(chain: BlockchainId, address: string) {
  return `${BASE_URL}?${new URLSearchParams({
    appId: APP_ID,
    asset: CHAIN_TO_ASSET[chain],
    destination_wallets: JSON.stringify([
      {
        address,
        blockchains: [chain]
      }
    ])
  })}`;
}
