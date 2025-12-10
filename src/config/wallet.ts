export type BlockchainId =
  | "ethereum"
  | "bitcoin"
  | "cardano"
  | "solana"
  | "xrp"
  | "base"
  | "polygon";

export const ADMIN_WALLETS: { address: string; blockchains: BlockchainId[] }[] = [
  {
    address: "0xf363d7e6bEDfCcfaAF7e308660262373aef7639B",
    blockchains: ["ethereum", "base", "polygon"]
  },
  {
    address: "bc1q24wvkm9ux8h9k8dd087xgsqvg9ehd0q2penrh6",
    blockchains: ["bitcoin"]
  },
  {
    address:
      "addr1q9754gspzhdqct0dcpjnkntqzy7draz8zf8r6899f54qjsy5jvjn5tw2rn9avp44wnspvkkxl0fqs4tt8axvdf72dyxq2vr64m",
    blockchains: ["cardano"]
  },
  {
    address: "62t4ryqr1uUCu2AKVuZcJoyghKAcxcMKG6BjQZmFNJHp",
    blockchains: ["solana"]
  },
  {
    address: "rMtjpbpT5edGxUutM99GSEZK2hXeGUZHgu",
    blockchains: ["xrp"]
  }
];

export const SUPPORTED_BLOCKCHAINS: BlockchainId[] = [
  "ethereum",
  "bitcoin",
  "cardano",
  "solana",
  "xrp",
  "base",
  "polygon"
];

export function getWalletForChain(chain: BlockchainId): string | null {
  const wallet = ADMIN_WALLETS.find(w => w.blockchains.includes(chain));
  return wallet?.address ?? null;
}
