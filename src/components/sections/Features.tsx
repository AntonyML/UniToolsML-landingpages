import {
  ShieldOff,
  Cpu,
  FileText,
  BrainCircuit,
  BookOpen,
  Timer,
  Quote,
  Layers,
} from 'lucide-react';

const features = [
  {
    id: 'local-first',
    icon: ShieldOff,
    label: 'Local-First',
    title: 'Tus datos nunca salen de tu PC',
    description:
      'Sin servidores externos, sin telemetria, sin cuenta requerida para las herramientas gratuitas. Todo ocurre en tu maquina.',
    size: 'large',
    accent: 'indigo',
  },
  {
    id: 'rust-powered',
    icon: Cpu,
    label: 'Rust + Tauri',
    title: 'Rendimiento nativo',
    description: 'Motor escrito en Rust. Binarios ligeros, inicio instantaneo, sin el overhead de Electron.',
    size: 'small',
    accent: 'orange',
  },
  {
    id: 'pdf-engine',
    icon: FileText,
    label: 'PDF Engine',
    title: '12 operaciones de PDF incluidas',
    description:
      'Unir, dividir, comprimir, rotar, eliminar paginas, ordenar, numerar, extraer texto, convertir imagenes a PDF y mas. Todo con backend Rust.',
    size: 'large',
    accent: 'violet',
  },
  {
    id: 'study-tools',
    icon: Timer,
    label: 'Herramientas de estudio',
    title: 'Pomodoro, flashcards y tareas',
    description:
      'Temporizador Pomodoro configurable, flashcards manuales y con IA, lista de tareas y notas rapidas.',
    size: 'small',
    accent: 'emerald',
  },
  {
    id: 'citations',
    icon: Quote,
    label: 'Citas academicas',
    title: 'APA, IEEE y conversion entre formatos',
    description:
      'Genera, guarda y convierte citas entre formatos APA e IEEE. Incluye gestor de bibliografias y fuentes.',
    size: 'small',
    accent: 'blue',
  },
  {
    id: 'flashcards-ai',
    icon: Layers,
    label: 'Flashcards IA',
    title: 'Genera tarjetas automaticamente',
    description:
      'Pega un texto o sube un PDF y obtén flashcards listas para estudiar. Requiere Premium.',
    size: 'small',
    accent: 'cyan',
  },
  {
    id: 'hybrid-ai',
    icon: BrainCircuit,
    label: 'IA Generativa',
    title: '10+ herramientas con IA',
    description:
      'Analiza PDFs, genera guias de estudio, explica textos, crea preguntas de examen y mejora tu redaccion. Modelos locales o API propia.',
    size: 'large',
    accent: 'rose',
  },
  {
    id: 'research',
    icon: BookOpen,
    label: 'Investigacion',
    title: 'Organiza tus fuentes y notas',
    description:
      'Guarda referencias, agrega notas por paper, genera bibliografias completas. Sin dependencia de Zotero ni Mendeley.',
    size: 'small',
    accent: 'amber',
  },
];

const accentMap: Record<string, { badge: string; icon: string; border: string; glow: string }> = {
  indigo: { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', icon: 'text-indigo-400', border: 'hover:border-indigo-500/40', glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(99,102,241,0.3)]' },
  orange: { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: 'text-orange-400', border: 'hover:border-orange-500/40', glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.3)]' },
  violet: { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', icon: 'text-violet-400', border: 'hover:border-violet-500/40', glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.3)]' },
  blue:   { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',       icon: 'text-blue-400',   border: 'hover:border-blue-500/40',   glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.3)]' },
  emerald:{ badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: 'text-emerald-400', border: 'hover:border-emerald-500/40', glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.3)]' },
  cyan:   { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',       icon: 'text-cyan-400',   border: 'hover:border-cyan-500/40',   glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.3)]' },
  rose:   { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',       icon: 'text-rose-400',   border: 'hover:border-rose-500/40',   glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(244,63,94,0.3)]' },
  amber:  { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',    icon: 'text-amber-400',  border: 'hover:border-amber-500/40',  glow: 'group-hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)]' },
};

const pdfTools = ['Unir', 'Dividir', 'Comprimir', 'Rotar', 'Eliminar paginas', 'Ordenar', 'Imagenes a PDF', 'PDF a imagenes', 'Extraer texto', 'Numerar paginas', 'Organizar', 'OCR'];
const aiTools = ['Analizar PDF', 'Guia de estudio', 'Preguntas de examen', 'Conceptos clave', 'Mejorar redaccion', 'Bibliog. automatica', 'Explicar texto', 'Flashcards IA', 'Ideas de investigacion', 'Mapa conceptual'];

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            Características
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Todo en una sola app, sin conexión a internet
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Diseñado para flujos de trabajo académicos reales. Las herramientas gratuitas funcionan sin cuenta. La IA generativa requiere un plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
          {features.map((feature) => {
            const accent = accentMap[feature.accent];
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            const isPdf = feature.id === 'pdf-engine';
            const isAi = feature.id === 'hybrid-ai';

            return (
              <div
                key={feature.id}
                className={`group relative glass-card rounded-xl border border-zinc-800 p-6 transition-all duration-300 ${accent.border} ${accent.glow} ${isLarge ? 'lg:col-span-2' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-2.5 rounded-lg border ${accent.badge} ${accent.border}`}>
                    <Icon className={`w-5 h-5 ${accent.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded border ${accent.badge} mb-2`}>
                      {feature.label}
                    </span>
                    <h3 className="text-sm font-medium text-zinc-100 leading-snug mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                    </p>
                  </div>
                </div>

                {isPdf && (
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {pdfTools.map((tool) => (
                      <div key={tool} className="px-2.5 py-2 rounded-md bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 font-mono text-center hover:border-zinc-700 hover:text-zinc-200 transition-colors">
                        {tool}
                      </div>
                    ))}
                  </div>
                )}

                {isAi && (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {aiTools.map((tool) => (
                      <div key={tool} className="px-2.5 py-2 rounded-md bg-zinc-900/80 border border-rose-900/30 text-[11px] text-zinc-400 font-mono text-center hover:border-rose-500/30 hover:text-zinc-200 transition-colors">
                        {tool}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
