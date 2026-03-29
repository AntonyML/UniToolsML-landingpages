'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, ArrowRight, ChevronRight, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

type Platform = 'windows' | 'android' | 'apple' | null;
type DetectedOS = 'windows' | 'android' | 'apple' | 'other';

interface ChannelConfig {
  id: string;
  icon: typeof Monitor;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  items: string[];
  cta: string;
  ctaHref: string;
  recommended?: boolean;
}

function detectOS(): DetectedOS {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/windows/.test(ua)) return 'windows';
  if (/iphone|ipad|macintosh|mac os x/.test(ua)) return 'apple';
  return 'other';
}

const COMING_SOON_CHANNELS: ChannelConfig[] = [
  {
    id: 'mac',
    icon: Monitor,
    title: 'macOS',
    subtitle: 'Mac M1 / Intel',
    badge: 'Próximamente',
    badgeColor: 'emerald',
    items: [
      'App nativa para macOS',
      'Soporte Apple Silicon (M1/M2/M3)',
      'Integración con el ecosistema Apple',
    ],
    cta: 'Solicitar acceso',
    ctaHref: '/macos',
  },
  {
    id: 'iphone',
    icon: Smartphone,
    title: 'iPhone / iPad',
    subtitle: 'iOS & iPadOS',
    badge: 'Próximamente',
    badgeColor: 'emerald',
    items: [
      'App nativa para iOS / iPadOS',
      'Optimizada para iPhone y iPad',
      'Disponible en la App Store cuando esté publicada',
    ],
    cta: 'Solicitar acceso',
    ctaHref: '/ios',
  },
];

const CHANNELS: ChannelConfig[] = [
  {
    id: 'windows',
    icon: Monitor,
    title: 'Escritorio',
    subtitle: 'Windows 10 / 11',
    badge: 'Disponible',
    badgeColor: 'emerald',
    items: [
      'Acceso a la beta para Windows',
      'Sin tienda, sin intermediarios',
      'Actualizaciones según el programa de la beta',
    ],
    cta: 'Solicitar acceso',
    ctaHref: '/windows',
  },
  {
    id: 'apk',
    icon: Smartphone,
    title: 'Android',
    subtitle: 'Android 8.0+',
    badge: 'Disponible',
    badgeColor: 'emerald',
    items: [
      'Acceso a la beta para Android',
      'Participa en el canal de beta para recibir builds',
      'Control sobre tu participación en la beta',
    ],
    cta: 'Solicitar acceso',
    ctaHref: '/android-apk',
  },
];

const badgeColors: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  zinc:    'bg-zinc-700/30   text-zinc-500   border-zinc-700/40',
};

function orderChannels(selected: Platform, detected: DetectedOS): ChannelConfig[] {
  const channels = [...CHANNELS, ...COMING_SOON_CHANNELS];
  if (selected === 'android') return [
    { ...channels.find(c => c.id === 'apk')!,     recommended: true },
    channels.find(c => c.id === 'windows')!,
    channels.find(c => c.id === 'mac')!,
    channels.find(c => c.id === 'iphone')!,
  ];
  if (selected === 'windows') return [
    { ...channels.find(c => c.id === 'windows')!, recommended: true },
    channels.find(c => c.id === 'apk')!,
    channels.find(c => c.id === 'mac')!,
    channels.find(c => c.id === 'iphone')!,
  ];
  if (selected === 'apple') return [
    { ...channels.find(c => c.id === 'mac')!,     recommended: true },
    { ...channels.find(c => c.id === 'iphone')!,  recommended: true },
    channels.find(c => c.id === 'apk')!,
    channels.find(c => c.id === 'windows')!,
  ];
  if (detected === 'android') return [
    { ...channels.find(c => c.id === 'apk')!,     recommended: true },
    channels.find(c => c.id === 'windows')!,
    channels.find(c => c.id === 'mac')!,
    channels.find(c => c.id === 'iphone')!,
  ];
  if (detected === 'windows') return [
    { ...channels.find(c => c.id === 'windows')!, recommended: true },
    channels.find(c => c.id === 'apk')!,
    channels.find(c => c.id === 'mac')!,
    channels.find(c => c.id === 'iphone')!,
  ];
  if (detected === 'apple') return [
    { ...channels.find(c => c.id === 'mac')!,     recommended: true },
    { ...channels.find(c => c.id === 'iphone')!,  recommended: true },
    channels.find(c => c.id === 'apk')!,
    channels.find(c => c.id === 'windows')!,
  ];
  return channels;
}

const selectorOptions: { value: Platform; label: string; icon: typeof Monitor }[] = [
  { value: 'windows', label: 'Windows',  icon: Monitor    },
  { value: 'android', label: 'Android',  icon: Smartphone },
  { value: 'apple',   label: 'Apple',    icon: Apple      },
];

export default function PlatformDetector() {
  const [detected, setDetected] = useState<DetectedOS>('other');
  const [selected, setSelected] = useState<Platform>(null);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setDetected(detectOS());
    setMounted(true);
  }, []);

  const ordered = orderChannels(selected, detected);

  const detectedLabel =
    detected === 'windows' ? 'Windows' :
    detected === 'android' ? 'Android' :
    detected === 'apple'   ? 'Apple'   : null;

  const handleCTAClick = (id: string) => {
    const platform = id === 'apk' ? 'android' : id === 'mac' || id === 'iphone' ? 'apple' : 'windows';
    try { localStorage.setItem('unitools-selected-platform', platform); } catch {}
  };

  return (
    <div className="w-full">
      {/* Header — mismo patrón que Features, FAQ y TechStack */}
      <div className="text-center mb-10">
        <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
          Distribución
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Disponible donde lo necesitas
        </h2>
        <p className="mt-3 text-sm text-zinc-400 max-w-md mx-auto">
          Escritorio o móvil. Con tienda o sin tienda. Tú eliges.
        </p>
      </div>

      {/* Selector */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">¿Dónde lo usas?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {selectorOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(isActive ? null : opt.value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-[border-color,background-color,color] duration-200',
                  isActive
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                )}
              >
                <Icon className="w-4 h-4" />
                {opt.label}
              </button>
            );
          })}
        </div>

        {mounted && !selected && detectedLabel && (
          <p className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            Detectamos {detectedLabel} — recomendación abajo
          </p>
        )}
      </div>

      {/* Grid — min-height reservado para evitar CLS durante hidratación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[320px]">
        {ordered.map((channel) => {
          const Icon = channel.icon;
          const badgeClass = badgeColors[channel.badgeColor];
          const isAvailable = channel.badgeColor === 'emerald';

          return (
            <div
              key={channel.id}
              className={cn(
                'relative glass-card rounded-xl border p-5 flex flex-col gap-4 transition-[border-color,box-shadow] duration-200',
                channel.recommended
                  ? 'border-indigo-500/40 shadow-[0_0_30px_-8px_rgba(99,102,241,0.25)]'
                  : 'border-zinc-800 hover:border-zinc-700'
              )}
            >
              {channel.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                  Recomendado
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2 rounded-lg border',
                    channel.recommended ? 'bg-indigo-500/15 border-indigo-500/30' : 'bg-zinc-800/60 border-zinc-700'
                  )}>
                    <Icon className={cn('w-4 h-4', channel.recommended ? 'text-indigo-300' : 'text-zinc-400')} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{channel.title}</p>
                    <p className="text-xs text-zinc-500">{channel.subtitle}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded border shrink-0 ${badgeClass}`}>
                  {channel.badge}
                </span>
              </div>

              <ul className="flex flex-col gap-1.5 flex-1">
                {channel.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <ChevronRight className={cn('w-3.5 h-3.5 shrink-0 mt-0.5', channel.recommended ? 'text-indigo-500' : 'text-zinc-600')} />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={channel.ctaHref}
                onClick={() => handleCTAClick(channel.id)}
                className={cn(
                  'mt-auto flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg border text-xs font-medium transition-all duration-200',
                  isAvailable
                    ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500 hover:border-indigo-500'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                )}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {channel.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
