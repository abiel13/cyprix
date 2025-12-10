import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative z-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 md:flex-row md:items-center md:pb-20 md:pt-20 md:px-6">
        {/* Left – Copy */}
        <div className="md:w-1/2 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Coinbase Onramp integration preview
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Seamless{" "}
            <span className="bg-gradient-to-r from-purple-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
              multi-chain
            </span>{" "}
            top-ups
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
            Crypix acts as a streamlined gateway for funding your
            treasury across Ethereum, Bitcoin, Cardano, Solana, XRP and more –
            all via a single Coinbase-powered onramp.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#onramp"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:opacity-90 active:scale-[0.98]"
            >
              Launch onramp preview
            </Link>
            <span className="text-[11px] text-slate-400">
              No logins, no KYC storage. Just a clean onramp flow for review.
            </span>
          </div>

          <dl className="mt-8 flex flex-wrap gap-6 text-xs text-slate-300">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Supported networks
              </dt>
              <dd className="mt-1 font-semibold">ETH · BTC · ADA · SOL · XRP</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Integration focus
              </dt>
              <dd className="mt-1 font-semibold">
                Coinbase onramp · static wallets
              </dd>
            </div>
          </dl>
        </div>

        {/* Right – Card / Visual */}
        <div className="md:w-1/2">
          <div className="relative mx-auto h-[260px] max-w-sm rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-purple-900/40 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Onramp session
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                Sandbox
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[11px] text-slate-400">Source</p>
                <p className="mt-1 font-semibold">Card · Bank</p>
                <p className="mt-3 text-[10px] text-slate-500">
                  Processed by Coinbase. No card data hits Crypix.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[11px] text-slate-400">Destination</p>
                <p className="mt-1 font-semibold">Admin treasury</p>
                <p className="mt-3 text-[10px] text-slate-500">
                  Static wallets per chain, configurable in code.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 to-slate-900/40 px-3 py-2">
              <div className="text-[11px] text-slate-300">
                <p className="uppercase tracking-[0.18em] text-slate-500">
                  Preview
                </p>
                <p className="mt-1 font-semibold">1-click onramp session</p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <p>Coinbase widget</p>
                <p className="mt-0.5 text-[10px] text-emerald-300">
                  Review-ready
                </p>
              </div>
            </div>

            {/* Glow bar */}
            <div className="pointer-events-none absolute inset-x-8 bottom-[-20px] h-12 rounded-full bg-gradient-to-r from-purple-500/40 via-emerald-400/40 to-indigo-500/40 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
