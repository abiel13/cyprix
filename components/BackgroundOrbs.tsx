export default function BackgroundOrbs() {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl animate-blob" />
        <div className="absolute right-[-80px] top-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-80px] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl animate-blob animation-delay-4000" />
  
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,1),_transparent_60%)] mix-blend-multiply" />
      </div>
    );
  }
  