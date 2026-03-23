import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, ShieldCheck } from 'lucide-react';
// Use a client-side CustomEvent to open the platform modal without requiring context during SSR

export default function Hero() {
  function CTA() {
    return (
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <Button variant="glow" size="lg" asChild>
          <a href="/#stack">Obtener Acceso Anticipado<ArrowRight className="w-4 h-4" /></a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="/#features">Ver Herramientas</a>
        </Button>
      </div>
    );
  }

  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="absolute inset-0 -z-10 bg-grid-zinc bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] -z-10"
      />

      {/* Badge */}
      <div className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
        </span>
        Acceso anticipado — Lista de espera abierta
      </div>

      {/* Headline */}
      <h1
        className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        <span className="text-gradient">Mas de 40 herramientas</span>
        <br />
        <span className="text-zinc-100">para el estudiante</span>
        <br />
        <span className="text-gradient-indigo">universitario.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="mt-6 text-center text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed animate-fade-up"
        style={{ animationDelay: '200ms' }}
      >
        PDFs, citas, notas, Pomodoro, generacion de citas APA/IEEE y herramientas de{' '}
        <span className="text-zinc-200 font-medium">IA generativa</span>.
        Construido con{' '}
        <span className="text-zinc-200 font-medium">Rust + Tauri</span>,
        funcionando{' '}
        <span className="text-zinc-200 font-medium">100% offline.</span>
      </p>

      {/* CTAs */}
      <CTA />

      {/* Trust signals */}
      <div
        className="mt-8 flex flex-wrap justify-center items-center gap-4 text-xs text-zinc-500 animate-fade-in"
        style={{ animationDelay: '450ms' }}
      >
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
          Sin cuenta para las herramientas gratuitas
        </span>
        <span className="w-px h-3 bg-zinc-800" />
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-zinc-600" />
          Windows y Android
        </span>
      </div>

      {/* App mockup */}
      <div
        className="mt-16 w-full max-w-4xl animate-fade-up"
        style={{ animationDelay: '400ms' }}
      >
        <div className="relative rounded-xl border border-zinc-800 glass shadow-[0_0_80px_-20px_rgba(99,102,241,0.25)] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">UniToolsML — v0.1.0</span>
          </div>

          {/* Mock UI */}
          <div className="flex min-h-[320px] sm:min-h-[380px]">
            {/* Sidebar */}
            <div className="hidden sm:flex flex-col w-52 border-r border-zinc-800 bg-zinc-950/80 p-3 gap-1">
              {[
                { icon: '▣', label: 'Inicio', active: true },
                { icon: '⬡', label: 'Documentos' },
                { icon: '◈', label: 'Estudio' },
                { icon: '◉', label: 'Universidad' },
                { icon: '◎', label: 'Investigacion' },
                { icon: '⬙', label: 'IA Premium' },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors ${
                    item.active
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="font-mono text-[10px]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Herramientas destacadas</p>
                  <h3 className="text-sm font-semibold text-zinc-100 mt-0.5">Bienvenido a UniToolsML</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Offline
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Unir PDF', desc: 'Combina multiples PDFs', color: 'indigo' },
                  { label: 'Pomodoro', desc: 'Temporizador de estudio', color: 'emerald' },
                  { label: 'Cita APA', desc: 'Genera citas academicas', color: 'violet' },
                  { label: 'Flashcards', desc: 'Tarjetas de memoria', color: 'blue' },
                  { label: 'Contador', desc: 'Palabras y caracteres', color: 'orange' },
                  { label: 'Analizar PDF', desc: 'IA Premium', color: 'rose' },
                ].map((card) => (
                  <div key={card.label} className="glass-card rounded-lg p-3">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wide font-mono">{card.label}</p>
                    <p className="mt-1 text-xs font-semibold text-zinc-200">{card.desc}</p>
                    <div className={`mt-2 h-0.5 rounded-full bg-${card.color}-500/40`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow reflection */}
        <div className="h-12 mx-8 bg-gradient-to-b from-indigo-500/10 to-transparent blur-xl rounded-b-full" />
      </div>
    </section>
  );
}
