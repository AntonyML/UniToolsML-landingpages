import { Trophy, Zap, FileText, BookOpen, Timer, ArrowRight } from 'lucide-react';

const achievements = [
  { icon: FileText, label: 'Procesa 5 PDFs',       reward: '+3 consultas IA' },
  { icon: BookOpen, label: 'Crea 10 flashcards',   reward: '+5 consultas IA' },
  { icon: Timer,    label: 'Completa 4 Pomodoros', reward: '+2 consultas IA' },
  { icon: Zap,      label: 'Genera 3 citas APA',   reward: '+2 consultas IA' },
];

export default function FreeValue() {
  return (
    <section id="free" className="relative py-28 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            Gratis para siempre
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Todas las herramientas base sin pagar nada
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            40+ herramientas offline · Sin cuenta · Sin anuncios · Sin tiempo límite
          </p>
        </div>

        {/* Achievements */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-zinc-100">
              Completa logros para desbloquear consultas IA
            </h3>
          </div>
          <p className="text-sm text-zinc-400 mb-8">
            Estudia, organiza documentos, cumple metas. Gana iteraciones con IA gratis.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {achievements.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.label}
                  className="flex flex-col gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">{a.label}</p>
                    <p className="text-[11px] text-amber-400 mt-0.5 font-mono">{a.reward}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/#pricing"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Quiero IA ilimitada
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
