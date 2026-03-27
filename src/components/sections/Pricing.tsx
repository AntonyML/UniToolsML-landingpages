import { Check } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Para tareas puntuales',
    price: '7.99',
    usage: 'Hasta 3 proyectos activos',
    popular: false,
    features: [
      'Todas las herramientas gratuitas',
      'Análisis de PDFs hasta 100 páginas',
      'Flujos de trabajos personalizados',
      'Soporte por correo',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Para semestres completos',
    price: '14.99',
    usage: 'Proyectos ilimitados',
    popular: true,
    features: [
      'Todo lo de Basic',
      'Análisis de PDFs extensos',
      'Modelos avanzados',
      'Soporte prioritario',
    ],
  },
  {
    id: 'power',
    name: 'Power',
    tagline: 'Para tesis e investigación',
    price: '29.99',
    usage: 'Uso intensivo real',
    popular: false,
    features: [
      '5 días de prueba sin tarjeta',
      'Procesamiento prioritario (sin colas)',
      'Múltiples documentos simultáneos',
      'Acceso anticipado ',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            UniTools Premium
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            IA ilimitada sin depender de logros
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Las herramientas gratuitas siempre son gratis. Premium desbloquea la IA sin límites.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col gap-5 rounded-xl border p-6 transition-all duration-200 ${
                plan.popular
                  ? 'border-indigo-500/50 bg-indigo-500/5 shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)] md:-mt-4'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-indigo-500 to-violet-500">
                  Popular
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-zinc-100">{plan.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{plan.tagline}</p>
              </div>

              <div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-zinc-100">${plan.price}</span>
                  <span className="text-sm text-zinc-500 mb-1">USD / mes</span>
                </div>
                <span className="inline-block mt-2 text-[11px] font-mono px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  {plan.queries}
                </span>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/#newsletter"
                className={`flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                    : 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600'
                }`}
              >
                Elegir
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          O sigue gratis con logros. Tú eliges. Pagos: SINPE Móvil + PayPal. Cancela cuando quieras.
        </p>

      </div>
    </section>
  );
}
