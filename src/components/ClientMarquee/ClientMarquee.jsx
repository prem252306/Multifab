export default function ClientMarquee() {
  const clients = [
    "ABB Group",
    "BOSCH",
    "L&T Engineering",
    "SIEMENS",
    "SCHNEIDER ELECTRIC",
    "TATA STEEL",
    "GENERAL ELECTRIC",
    "HONEYWELL"
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0b0f19]/80 gold:bg-black/80 transition-colors duration-300 relative overflow-hidden border-t border-b border-slate-200/5">
      {/* Fade Masks */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-slate-50 dark:from-[#0b0f19] gold:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-slate-50 dark:from-[#0b0f19] gold:from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-[200%] md:w-[150%] animate-marquee">
        <div className="flex justify-around items-center min-w-full gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white/50 dark:bg-slate-900/60 gold:bg-[#121212] border border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/20 px-8 py-5 rounded-2xl shadow-md backdrop-blur-sm flex items-center justify-center font-outfit font-black tracking-widest text-slate-500 dark:text-slate-400 gold:text-[#d4af37]/70 text-lg md:text-2xl whitespace-nowrap min-w-[200px]"
            >
              {client}
            </div>
          ))}
        </div>
        <div className="flex justify-around items-center min-w-full gap-8">
          {clients.map((client, index) => (
            <div
              key={`dup-${index}`}
              className="bg-white/50 dark:bg-slate-900/60 gold:bg-[#121212] border border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/20 px-8 py-5 rounded-2xl shadow-md backdrop-blur-sm flex items-center justify-center font-outfit font-black tracking-widest text-slate-500 dark:text-slate-400 gold:text-[#d4af37]/70 text-lg md:text-2xl whitespace-nowrap min-w-[200px]"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}