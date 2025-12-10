export default function Footer() {
    return (
      <footer
        id="security"
        className="relative z-10 border-t border-white/5 bg-black/30"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-semibold text-slate-200">Security posture</p>
            <p className="mt-1 max-w-md">
              Crypix does not store card data or custodial funds. All payments are
              initiated and processed by Coinbase. This UI simply orchestrates the flow.
            </p>
          </div>
          <div className="space-y-1 text-[11px]">
            <p>Admin wallets &amp; networks are code-configurable.</p>
            <p className="text-slate-500">
              For demo / review only – no production guarantees implied.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  