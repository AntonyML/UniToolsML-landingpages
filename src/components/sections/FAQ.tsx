'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'UniToolsML requiere conexion a internet?',
    a: 'No para las herramientas gratuitas. Todo el procesamiento de PDFs, citas, flashcards, Pomodoro y notas ocurre localmente en tu dispositivo. La conectividad solo se usa si decides conectar una API de IA externa (OpenAI, Anthropic, etc.) en las herramientas Premium.',
  },
  {
    q: 'En que plataformas esta disponible?',
    a: 'Windows 10/11 esta disponible para descarga directa desde esta web. Android esta en desarrollo activo — podras descargar el APK directo o conseguirlo via Play Store . macOS y Linux estan  sin fecha confirmada.',
  },
  {
    q: 'Como funciona el pago? Aceptan SINPE?',
    a: 'Si. Aceptamos SINPE Movil y PayPal para la version de escritorio y el APK de Android. Para la version de Play Store, el pago pasa por Google Play Billing (credito, debito, etc).',
  },
  {
    q: 'Que incluye el plan Premium?',
    a: 'Las herramientas de IA generativa: analisis de PDFs, generacion de guias de estudio, preguntas de examen, flashcards automaticas, mejora de redaccion, explicacion de textos, mapas conceptuales y mas. Las herramientas de documentos, estudio, citas y utilidades son completamente gratuitas.',
  },
  {
    q: 'Necesito crear una cuenta para usarlo?',
    a: 'No para las herramientas gratuitas. Para el plan Premium si necesitas una cuenta para gestionar tu suscripcion. Nada de tus documentos o datos academicos sale de tu dispositivo en ningun caso.',
  },
  {
    q: 'Por que Tauri y no Electron?',
    a: 'Electron incluye Chromium completo, lo que resulta en apps de 200-500MB con alto consumo de RAM. Tauri usa el WebView nativo del sistema y Rust para el backend — el instalador pesa menos de 15MB y el consumo de memoria es mucho menor.',
  },
  {
    q: 'Las herramientas de IA funcionan sin internet?',
    a: 'Dependiendo del modelo. Si conectas un modelo local compatible (via LM Studio u Ollama) las herramientas de IA tambien funcionan 100% offline. Si usas una API externa como OpenAI, necesitas conexion solo en ese momento.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn('border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200', isOpen && 'border-zinc-700 shadow-[0_0_20px_-8px_rgba(99,102,241,0.2)]')}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-zinc-900/40 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn('text-sm font-medium leading-snug transition-colors', isOpen ? 'text-zinc-100' : 'text-zinc-300')}>
          {question}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-zinc-500 flex-shrink-0 ml-4 transition-transform duration-300', isOpen && 'rotate-180 text-indigo-400')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-96' : 'max-h-0')}>
        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 text-xs font-mono uppercase tracking-widest text-zinc-500">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Tienes otra pregunta?{' '}
          <a href="mailto:hello@unitoolsml.dev" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Escribenos directamente.
          </a>
        </p>
      </div>
    </section>
  );
}
