'use client';

// ThemeSwitcher — réplica exacta de UniToolsMLDEV/src/components/molecules/ThemeSwitcher.tsx
// Adaptado para el landing: sin Tauri, persiste en localStorage únicamente.
import { useState, useEffect, useRef, useCallback } from 'react';
import { Monitor, Moon, Sun, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Tipos ────────────────────────────────────────────────────────────────────
type ThemeId   = 'blue' | 'green' | 'neutral' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeDefinition { id: ThemeId; label: string; preview: string; }

// ── Datos (igual que theme.ts del original) ──────────────────────────────────
const THEMES: ThemeDefinition[] = [
  { id: 'blue',    label: 'Azul',    preview: 'oklch(0.488 0.243 264.376)' },
  { id: 'violet',  label: 'Violeta', preview: 'oklch(0.541 0.281 293.009)' },
  { id: 'green',   label: 'Verde',   preview: 'oklch(0.648 0.2 131.684)'   },
  { id: 'orange',  label: 'Naranja', preview: 'oklch(0.646 0.222 41.116)'  },
  { id: 'red',     label: 'Rojo',    preview: 'oklch(0.577 0.245 27.325)'  },
  { id: 'rose',    label: 'Rosado',  preview: 'oklch(0.586 0.253 17.585)'  },
  { id: 'yellow',  label: 'Amarillo',preview: 'oklch(0.852 0.199 91.936)'  },
  { id: 'neutral', label: 'Neutral', preview: 'oklch(0.205 0 0)'           },
];

const MODES: { id: ThemeMode; label: string; Icon: React.ElementType }[] = [
  { id: 'light',  label: 'Claro',   Icon: Sun     },
  { id: 'dark',   label: 'Oscuro',  Icon: Moon    },
  { id: 'system', label: 'Sistema', Icon: Monitor },
];

// ── CSS de todos los temas — mismo contenido que themes.css del original ─────
const THEME_CSS = `
:root,[data-theme="blue"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.488 0.243 264.376);--primary-foreground:oklch(0.97 0.014 254.604);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.708 0 0);}
[data-theme="blue"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.488 0.243 264.376);--primary-foreground:oklch(0.97 0.014 254.604);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.556 0 0);}
[data-theme="green"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.648 0.2 131.684);--primary-foreground:oklch(0.986 0.031 120.757);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.841 0.238 128.85);}
[data-theme="green"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.648 0.2 131.684);--primary-foreground:oklch(0.986 0.031 120.757);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.405 0.101 131.063);}
[data-theme="neutral"]{--radius:0.625rem;--background:oklch(1 0 0);--foreground:oklch(0.145 0 0);--card:oklch(1 0 0);--card-foreground:oklch(0.145 0 0);--popover:oklch(1 0 0);--popover-foreground:oklch(0.145 0 0);--primary:oklch(0.205 0 0);--primary-foreground:oklch(0.985 0 0);--secondary:oklch(0.97 0 0);--secondary-foreground:oklch(0.205 0 0);--muted:oklch(0.97 0 0);--muted-foreground:oklch(0.556 0 0);--accent:oklch(0.97 0 0);--accent-foreground:oklch(0.205 0 0);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.922 0 0);--input:oklch(0.922 0 0);--ring:oklch(0.708 0 0);}
[data-theme="neutral"].dark{--background:oklch(0.145 0 0);--foreground:oklch(0.985 0 0);--card:oklch(0.205 0 0);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.205 0 0);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.922 0 0);--primary-foreground:oklch(0.205 0 0);--secondary:oklch(0.269 0 0);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.269 0 0);--muted-foreground:oklch(0.708 0 0);--accent:oklch(0.269 0 0);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.556 0 0);}
[data-theme="orange"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.646 0.222 41.116);--primary-foreground:oklch(0.98 0.016 73.684);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.75 0.183 55.934);}
[data-theme="orange"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.705 0.213 47.604);--primary-foreground:oklch(0.98 0.016 73.684);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.408 0.123 38.172);}
[data-theme="red"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.577 0.245 27.325);--primary-foreground:oklch(0.971 0.013 17.38);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.704 0.191 22.216);}
[data-theme="red"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.637 0.237 25.331);--primary-foreground:oklch(0.971 0.013 17.38);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.396 0.141 25.723);}
[data-theme="rose"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.586 0.253 17.585);--primary-foreground:oklch(0.969 0.015 12.422);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.712 0.194 13.428);}
[data-theme="rose"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.645 0.246 16.439);--primary-foreground:oklch(0.969 0.015 12.422);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.41 0.159 10.272);}
[data-theme="violet"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.541 0.281 293.009);--primary-foreground:oklch(0.969 0.016 293.756);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.702 0.183 293.541);}
[data-theme="violet"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.606 0.25 292.717);--primary-foreground:oklch(0.969 0.016 293.756);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.38 0.189 293.745);}
[data-theme="yellow"]{--radius:0.65rem;--background:oklch(1 0 0);--foreground:oklch(0.141 0.005 285.823);--card:oklch(1 0 0);--card-foreground:oklch(0.141 0.005 285.823);--popover:oklch(1 0 0);--popover-foreground:oklch(0.141 0.005 285.823);--primary:oklch(0.852 0.199 91.936);--primary-foreground:oklch(0.421 0.095 57.708);--secondary:oklch(0.967 0.001 286.375);--secondary-foreground:oklch(0.21 0.006 285.885);--muted:oklch(0.967 0.001 286.375);--muted-foreground:oklch(0.552 0.016 285.938);--accent:oklch(0.967 0.001 286.375);--accent-foreground:oklch(0.21 0.006 285.885);--destructive:oklch(0.577 0.245 27.325);--border:oklch(0.92 0.004 286.32);--input:oklch(0.92 0.004 286.32);--ring:oklch(0.852 0.199 91.936);}
[data-theme="yellow"].dark{--background:oklch(0.141 0.005 285.823);--foreground:oklch(0.985 0 0);--card:oklch(0.21 0.006 285.885);--card-foreground:oklch(0.985 0 0);--popover:oklch(0.21 0.006 285.885);--popover-foreground:oklch(0.985 0 0);--primary:oklch(0.795 0.184 86.047);--primary-foreground:oklch(0.421 0.095 57.708);--secondary:oklch(0.274 0.006 286.033);--secondary-foreground:oklch(0.985 0 0);--muted:oklch(0.274 0.006 286.033);--muted-foreground:oklch(0.705 0.015 286.067);--accent:oklch(0.274 0.006 286.033);--accent-foreground:oklch(0.985 0 0);--destructive:oklch(0.704 0.191 22.216);--border:oklch(1 0 0/10%);--input:oklch(1 0 0/15%);--ring:oklch(0.421 0.095 57.708);}
/* Keep theme switcher icons stable between server and client
   Render both icons in DOM and control visibility via CSS (prefers-color-scheme
   and data-theme). This avoids SSR/Client mismatches on the active SVG/path. */
.ut-theme-icon .ut-sun { display: inline-block; }
.ut-theme-icon .ut-moon { display: none; }
@media (prefers-color-scheme: dark) {
  .ut-theme-icon .ut-sun { display: none; }
  .ut-theme-icon .ut-moon { display: inline-block; }
}
[data-theme].dark .ut-theme-icon .ut-sun { display: none; }
[data-theme].dark .ut-theme-icon .ut-moon { display: inline-block; }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────
const LS_THEME = 'unitools-theme';
const LS_MODE  = 'unitools-mode';

function injectThemeStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('unitools-themes')) return;
  const el = document.createElement('style');
  el.id = 'unitools-themes';
  el.textContent = THEME_CSS;
  document.head.appendChild(el);
}

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'dark')  return true;
  if (mode === 'light') return false;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: ThemeId, mode: ThemeMode) {
  injectThemeStyles();
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', resolveIsDark(mode));
}

function persist(theme: ThemeId, mode: ThemeMode) {
  localStorage.setItem(LS_THEME, theme);
  localStorage.setItem(LS_MODE,  mode);
}

function readStored(): { theme: ThemeId; mode: ThemeMode } {
  return {
    theme: (localStorage.getItem(LS_THEME) as ThemeId)   || 'blue',
    mode:  (localStorage.getItem(LS_MODE)  as ThemeMode) || 'system',
  };
}

// ── Componente ───────────────────────────────────────────────────────────────
export default function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeId>('blue');
  const [mode,  setModeState]  = useState<ThemeMode>('system');
  const [open,  setOpen]       = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Inicializar desde localStorage (solo cliente)
  useEffect(() => {
    const stored = readStored();
    setThemeState(stored.theme);
    setModeState(stored.mode);
    applyTheme(stored.theme, stored.mode);
  }, []);

  // Seguir preferencia del sistema si modo = system
  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(theme, 'system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, mode]);

  // Cerrar al click fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const changeTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    applyTheme(t, mode);
    persist(t, mode);
  }, [mode]);

  const changeMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    applyTheme(theme, m);
    persist(theme, m);
  }, [theme]);

  const isDark = resolveIsDark(mode);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Cambiar tema"
        className="flex items-center justify-center h-9 w-9 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <span className="ut-theme-icon inline-flex items-center">
          <Sun className="ut-sun h-4 w-4" />
          <Moon className="ut-moon h-4 w-4" />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 z-[100] rounded-lg border border-zinc-700/60 bg-zinc-900/95 backdrop-blur-sm shadow-xl p-2">

          {/* ── Sección Modo ── */}
          <p className="px-1 pb-1 text-[11px] text-zinc-500 font-normal select-none">Modo</p>
          <div className="flex gap-1 px-1 pb-2">
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => changeMode(id)}
                aria-label={label}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 rounded-md py-1.5 text-xs transition-colors',
                  'hover:bg-zinc-800 hover:text-zinc-100',
                  mode === id
                    ? 'bg-zinc-800 text-zinc-100 font-medium'
                    : 'text-zinc-400'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Separador */}
          <div className="border-t border-zinc-700/60 my-1" />

          {/* ── Sección Color ── */}
          <p className="px-1 pb-1 pt-1 text-[11px] text-zinc-500 font-normal select-none">Color</p>
          <div className="grid grid-cols-4 gap-1 px-1 pb-1">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                aria-label={t.label}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-md p-1.5 text-[10px] transition-colors',
                  'hover:bg-zinc-800',
                  theme === t.id ? 'bg-zinc-800 font-medium text-zinc-100' : 'text-zinc-400'
                )}
              >
                {/* Swatch */}
                <span
                  className="h-5 w-5 rounded-full border border-zinc-600/50 shadow-sm relative flex items-center justify-center"
                  style={{ background: t.preview }}
                >
                  {theme === t.id && (
                    <Check className="h-3 w-3 text-white drop-shadow" />
                  )}
                </span>
                <span className="leading-none">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
