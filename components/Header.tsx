import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/40">
            <span className="text-xs font-black tracking-tight">CX</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              Crypix
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Onramp
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-8 text-xs text-slate-300 md:flex">
          <Link href="#how" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="#networks" className="hover:text-white transition-colors">
            Networks
          </Link>
          <Link href="#security" className="hover:text-white transition-colors">
            Security
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
            Onramp Sandbox Ready
          </span>
        </div>
      </div>
    </header>
  );
}
