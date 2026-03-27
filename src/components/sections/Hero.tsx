import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="absolute inset-0 -z-10 bg-grid-zinc bg-grid opacity-30" />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] -z-10" />

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
        className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl text-zinc-50 animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        Mas de 40 herramientas<br />
        para el estudiante<br />
        <span className="text-gradient-indigo">universitario.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="mt-6 text-center text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal animate-fade-up"
        style={{ animationDelay: '200ms' }}
      >
        PDFs, citas, notas, Pomodoro, generación de citas APA/IEEE e IA generativa.
        Construido con Rust + Tauri, funcionando 100% offline.
      </p>

      {/* CTAs */}
      <div
        className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-up"
        style={{ animationDelay: '300ms' }}
      >
        <Button variant="glow" size="lg" asChild>
          <a href="/#stack">Obtener Acceso Anticipado<ArrowRight className="w-4 h-4" /></a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="/#features">Ver Herramientas</a>
        </Button>
      </div>

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
    </section>
  );
}
