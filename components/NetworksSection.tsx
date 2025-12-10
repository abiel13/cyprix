const chains = [
    { name: "Ethereum", symbol: "ETH", accent: "from-emerald-400 to-sky-400" },
    { name: "Bitcoin", symbol: "BTC", accent: "from-amber-400 to-orange-500" },
    { name: "Cardano", symbol: "ADA", accent: "from-sky-400 to-blue-500" },
    { name: "Solana", symbol: "SOL", accent: "from-fuchsia-400 to-emerald-400" },
    { name: "XRP", symbol: "XRP", accent: "from-slate-200 to-slate-500" },
    { name: "Base", symbol: "BASE", accent: "from-blue-400 to-indigo-500" },
    { name: "Polygon", symbol: "MATIC", accent: "from-indigo-400 to-violet-500" }
  ];
  
  export default function NetworksSection() {
    return (
      <section id="networks" className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Networks in scope</h2>
              <p className="mt-2 max-w-md text-sm text-slate-300">
                The initial Crypix integration routes top-ups to static admin wallets on a
                curated set of chains, all defined in a single configuration file.
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Wallet addresses can be rotated or expanded without touching the UI layer.
            </p>
          </div>
  
          <div className="grid gap-4 md:grid-cols-4">
            {chains.map((chain) => (
              <div
                key={chain.name}
                className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-xs shadow-lg shadow-black/40 backdrop-blur-lg transition hover:-translate-y-1 hover:border-emerald-400/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      {chain.symbol}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {chain.name}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${chain.accent} opacity-90 blur-[0.5px]`}
                  />
                </div>
                <p className="mt-3 text-[11px] text-slate-300">
                  Configured in <code className="font-mono">wallets.ts</code> and mapped
                  to Coinbase onramp as the destination.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  