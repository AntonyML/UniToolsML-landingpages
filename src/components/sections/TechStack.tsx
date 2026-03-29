import PlatformDetector from '@/components/sections/PlatformDetector';

const stack = [
  { name: 'Tauri 2',             desc: 'Runtime nativo',      color: '#FFC131' },
  { name: 'Rust',                desc: 'PDF y procesamiento', color: '#CE412B' },
  { name: 'React',               desc: 'Interfaz',            color: '#61DAFB' },
  { name: 'SQLite',              desc: 'Base de datos local', color: '#44A2DC' },
  { name: 'Cloudflare Workers',  desc: 'Backend de pagos',    color: '#F6821F' },
  { name: 'Vite',                desc: 'Build system',        color: '#646CFF' },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-24 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-5xl mx-auto">

        <PlatformDetector client:load />

        <div className="mt-20 text-center mb-10">
          <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            Stack técnico
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Construido sobre fundamentos sólidos
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
          {stack.map((tech) => (
            <div key={tech.name} className="group glass-card rounded-xl border border-zinc-800 p-4 flex flex-col items-center gap-2.5 hover:border-zinc-700 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 will-change-transform">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: `${tech.color}20`, color: tech.color, border: `1px solid ${tech.color}30` }}
              >
                {tech.name.slice(0, 2)}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-zinc-200">{tech.name}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{tech.desc}</p>
              </div>
              <div
                className="w-full h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${tech.color}60, transparent)` }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '40+',  label: 'Herramientas' },
            { value: '100%', label: 'Offline-first' },
            { value: '0',    label: 'Datos enviados a cloud' },
            { value: 'Rust', label: 'Motor de PDF y OCR' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
