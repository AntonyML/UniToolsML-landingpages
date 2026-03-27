'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, ShoppingBag, ArrowRight, Download, ExternalLink, ChevronRight, Apple, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Platform = 'windows' | 'android' | 'both' | 'apple' | null;
type DetectedOS = 'windows' | 'android' | 'other';

function detectOS(): DetectedOS {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/windows/.test(ua)) return 'windows';
  return 'other';
}

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
  ctaVariant: 'glow' | 'outline' | 'secondary';
  recommended?: boolean;
  // Play Store channel must NOT mention external payment comparisons
  playStoreSafe?: boolean;
  comingSoon?: boolean;
}

const COMING_SOON_CHANNELS: ChannelConfig[] = [
  {
    id: 'mac',
    icon: Monitor,
    title: 'macOS',
    subtitle: 'Mac M1 / Intel',
    badge: 'Próximamente',
    badgeColor: 'zinc',
    items: [
      'App nativa para macOS',
      'Soporte Apple Silicon (M1/M2/M3)',
      'Integración con el ecosistema Apple',
    ],
    cta: 'Notificarme',
    ctaHref: '#newsletter',
    ctaVariant: 'secondary',
    comingSoon: true,
  },
  {
    id: 'iphone',
    icon: Smartphone,
    title: 'iPhone / iPad',
    subtitle: 'iOS & iPadOS',
    badge: 'Próximamente',
    badgeColor: 'zinc',
    items: [
      'App nativa para iOS / iPadOS',
      'Optimizada para iPhone y iPad',
      'Disponible en la App Store',
    ],
    cta: 'Notificarme',
    ctaHref: '#newsletter',
    ctaVariant: 'secondary',
    comingSoon: true,
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
    ctaVariant: 'glow',
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
      'Participa en el canal de beta para recibir builds y actualizaciones',
      'Control sobre tu participación en la beta',
    ],
    cta: 'Solicitar acceso',
    ctaHref: '/android',
    ctaVariant: 'outline',
  },
  {
    id: 'play',
    icon: ShoppingBag,
    title: 'Google Play',
    subtitle: 'Play Store',
    badge: 'Próximamente',
    badgeColor: 'zinc',
    items: [
      'Próximamente en Google Play Store',
      'Publicación y actualizaciones desde Play Store cuando esté disponible',
      'Recibirás notificaciones cuando la app esté publicada',
    ],
    cta: 'Notificarme',
    ctaHref: '/play',
    ctaVariant: 'secondary',
    playStoreSafe: true,
    comingSoon: true,
  },
];

const badgeColors: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber:   'bg-amber-500/10  text-amber-400  border-amber-500/20',
  zinc:    'bg-zinc-700/30   text-zinc-500   border-zinc-700/40',
};

// Reorder channels based on detected/selected platform
function orderChannels(selected: Platform, detected: DetectedOS): ChannelConfig[] {
  const channels = [...CHANNELS];
  if (selected === 'android') {
    // Play Store first, then APK, then Windows
    return [
      { ...channels.find(c => c.id === 'play')!, recommended: true },
      channels.find(c => c.id === 'apk')!,
      channels.find(c => c.id === 'windows')!,
    ];
  }
  if (selected === 'windows') {
    return [
      { ...channels.find(c => c.id === 'windows')!, recommended: true },
      channels.find(c => c.id === 'apk')!,
      channels.find(c => c.id === 'play')!,
    ];
  }
  if (selected === 'both') {
    return [
      { ...channels.find(c => c.id === 'windows')!, recommended: true },
      { ...channels.find(c => c.id === 'play')!, recommended: true },
      channels.find(c => c.id === 'apk')!,
    ];
  }
  // Auto-detected fallback
  if (detected === 'android') {
    return [
      { ...channels.find(c => c.id === 'play')!, recommended: true },
      channels.find(c => c.id === 'apk')!,
      channels.find(c => c.id === 'windows')!,
    ];
  }
  if (detected === 'windows') {
    return [
      { ...channels.find(c => c.id === 'windows')!, recommended: true },
      channels.find(c => c.id === 'apk')!,
      channels.find(c => c.id === 'play')!,
    ];
  }
  return channels;
}

const selectorOptions: { value: Platform; label: string; icon: typeof Monitor }[] = [
  { value: 'windows', label: 'Estudio en PC',      icon: Monitor },
  { value: 'android', label: 'Uso en el telefono', icon: Smartphone },
  { value: 'both',    label: 'Ambos',              icon: ShoppingBag },
  { value: 'apple',   label: 'iPhone / Mac',       icon: Apple },
];

export default function PlatformDetector() {
  const [detected, setDetected] = useState<DetectedOS>('other');
  const [selected, setSelected] = useState<Platform>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const os = detectOS();
    setDetected(os);
    setMounted(true);
  }, []);

  const ordered = orderChannels(selected, detected);
  const showAppleTeaser = selected === 'apple';

  const detectedLabel =
    detected === 'windows' ? 'Windows' :
    detected === 'android' ? 'Android' :
    null;

  return (
    <div className="w-full">
      {/* Selector */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Donde quieres usar UniToolsML?</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {selectorOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(isActive ? null : opt.value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                )}
              >
                <Icon className="w-4 h-4" />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Auto-detect hint — only show if no selection made */}
        {mounted && !selected && detectedLabel && (
          <p className="flex items-center gap-1.5 text-xs text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            Detectamos que estas en{' '}
            <span className="text-zinc-400 font-medium">{detectedLabel}</span>
            {' '}— recomendacion personalizada abajo
          </p>
        )}
      </div>

      {/* Apple coming soon teaser */}
      {showAppleTeaser && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 text-sm text-zinc-400">
          <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
          <span>
            <strong className="text-zinc-200">iPhone y Mac</strong> están en el roadmap.
            Regístrate abajo para recibir una notificación cuando estén disponibles.
          </span>
        </div>
      )}

      {/* Channels grid */}
      <div className={cn(
        'grid gap-4 transition-all duration-300',
        showAppleTeaser ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
      )}>
        {(showAppleTeaser ? COMING_SOON_CHANNELS : ordered).map((channel, i) => {
          const Icon = channel.icon;
          const badgeClass = badgeColors[channel.badgeColor];
          const isFirst = i === 0;

          return (
            <div
              key={channel.id}
              className={cn(
                'relative glass-card rounded-xl border p-5 flex flex-col gap-4 transition-all duration-300',
                channel.recommended
                  ? 'border-indigo-500/40 shadow-[0_0_30px_-8px_rgba(99,102,241,0.25)] scale-[1.02]'
                  : 'border-zinc-800 hover:border-zinc-700'
              )}
            >
              {/* Recommended pill */}
              {channel.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
                  Recomendado para ti
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2.5 rounded-lg border',
                    channel.recommended
                      ? 'bg-indigo-500/15 border-indigo-500/30'
                      : 'bg-zinc-800/60 border-zinc-700'
                  )}>
                    <Icon className={cn('w-5 h-5', channel.recommended ? 'text-indigo-300' : 'text-zinc-300')} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{channel.title}</p>
                    <p className="text-xs text-zinc-500">{channel.subtitle}</p>
                  </div>
                </div>
                <span className={`inline-block text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded border shrink-0 ${badgeClass}`}>
                  {channel.badge}
                </span>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-2 flex-1">
                {channel.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <ChevronRight className={cn('w-3.5 h-3.5 shrink-0 mt-0.5', channel.recommended ? 'text-indigo-500' : 'text-zinc-600')} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={channel.ctaVariant}
                size="sm"
                className="w-full mt-auto"
                disabled={channel.comingSoon}
                asChild={!channel.comingSoon}
              >
                {channel.comingSoon ? (
                  <span className="flex items-center gap-2 justify-center opacity-50 cursor-not-allowed">
                    <Clock className="w-3.5 h-3.5" />
                    Próximamente
                  </span>
                ) : (
                  <a href={channel.ctaHref}>
                    <ArrowRight className="w-3.5 h-3.5" />
                    {channel.cta}
                  </a>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
