export default function FeaturesSection() {
    const items = [
      {
        title: "Single-page integration",
        body: "A focused, minimal surface dedicated entirely to showcasing Coinbase onramp.",
        tag: "Review-friendly"
      },
      {
        title: "Static admin wallets",
        body: "Per-chain destination wallets are declared in code and easy to rotate or extend.",
        tag: "Config-driven"
      },
      {
        title: "No user accounts",
        body: "No local auth, no vault of PII. Just a secure redirection flow to Coinbase.",
        tag: "Low surface area"
      }
    ];
  
    return (
      <section id="how" className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <div className="mb-8 max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight">Built for clarity, not clutter</h2>
            <p className="mt-3 text-sm text-slate-300">
              Crypix is intentionally narrow in scope. The goal is to validate the onramp
              flow first, then evolve into a full treasury dashboard later.
            </p>
          </div>
  
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-white/5 p-4 text-sm shadow-lg shadow-black/30 backdrop-blur-lg transition hover:-translate-y-1 hover:border-purple-400/60 hover:bg-slate-900/60"
              >
                <span className="inline-flex rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-200">
                  {feature.tag}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  