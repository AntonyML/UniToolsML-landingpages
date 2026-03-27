'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import {
  ArrowRight, Terminal, ShieldCheck, Lock, X, Sparkles,
  Home, FileText, BookOpen, GraduationCap, Microscope, Zap,
  GitMerge, Quote, Type, Timer, Layers, Brain, Clipboard,
  Monitor, Moon, Sun, Check, PlayCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────
type ThemeId   = 'blue' | 'green' | 'neutral' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeDef {
  id: ThemeId; label: string; swatch: string;
  light: Record<string, string>;
  dark:  Record<string, string>;
}

const THEMES: ThemeDef[] = [
  {
    id: 'blue', label: 'Azul', swatch: 'oklch(0.488 0.243 264.376)',
    light: { '--primary': 'oklch(0.488 0.243 264.376)', '--primary-fg': 'oklch(0.97 0.014 254.604)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.488 0.243 264.376)', '--primary-fg': 'oklch(0.97 0.014 254.604)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'violet', label: 'Violeta', swatch: 'oklch(0.541 0.281 293.009)',
    light: { '--primary': 'oklch(0.541 0.281 293.009)', '--primary-fg': 'oklch(0.969 0.016 293.756)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.606 0.25 292.717)', '--primary-fg': 'oklch(0.969 0.016 293.756)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'green', label: 'Verde', swatch: 'oklch(0.648 0.2 131.684)',
    light: { '--primary': 'oklch(0.648 0.2 131.684)', '--primary-fg': 'oklch(0.986 0.031 120.757)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.648 0.2 131.684)', '--primary-fg': 'oklch(0.986 0.031 120.757)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'orange', label: 'Naranja', swatch: 'oklch(0.646 0.222 41.116)',
    light: { '--primary': 'oklch(0.646 0.222 41.116)', '--primary-fg': 'oklch(0.98 0.016 73.684)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.705 0.213 47.604)', '--primary-fg': 'oklch(0.98 0.016 73.684)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'red', label: 'Rojo', swatch: 'oklch(0.577 0.245 27.325)',
    light: { '--primary': 'oklch(0.577 0.245 27.325)', '--primary-fg': 'oklch(0.971 0.013 17.38)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.637 0.237 25.331)', '--primary-fg': 'oklch(0.971 0.013 17.38)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'rose', label: 'Rosado', swatch: 'oklch(0.586 0.253 17.585)',
    light: { '--primary': 'oklch(0.586 0.253 17.585)', '--primary-fg': 'oklch(0.969 0.015 12.422)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.645 0.246 16.439)', '--primary-fg': 'oklch(0.969 0.015 12.422)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'yellow', label: 'Amarillo', swatch: 'oklch(0.852 0.199 91.936)',
    light: { '--primary': 'oklch(0.852 0.199 91.936)', '--primary-fg': 'oklch(0.421 0.095 57.708)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.92 0.004 286.32)', '--text': 'oklch(0.141 0.005 285.823)', '--text-muted': 'oklch(0.552 0.016 285.938)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.967 0.001 286.375)' },
    dark:  { '--primary': 'oklch(0.795 0.184 86.047)', '--primary-fg': 'oklch(0.421 0.095 57.708)', '--bg': 'oklch(0.141 0.005 285.823)', '--surface': 'oklch(0.21 0.006 285.885)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.705 0.015 286.067)', '--sidebar-bg': 'oklch(0.18 0.005 285.823)', '--accent-bg': 'oklch(0.274 0.006 286.033)' },
  },
  {
    id: 'neutral', label: 'Neutral', swatch: 'oklch(0.205 0 0)',
    light: { '--primary': 'oklch(0.205 0 0)', '--primary-fg': 'oklch(0.985 0 0)', '--bg': 'oklch(0.985 0 0)', '--surface': 'oklch(1 0 0)', '--border': 'oklch(0.922 0 0)', '--text': 'oklch(0.145 0 0)', '--text-muted': 'oklch(0.556 0 0)', '--sidebar-bg': 'oklch(0.97 0 0)', '--accent-bg': 'oklch(0.97 0 0)' },
    dark:  { '--primary': 'oklch(0.922 0 0)', '--primary-fg': 'oklch(0.205 0 0)', '--bg': 'oklch(0.145 0 0)', '--surface': 'oklch(0.205 0 0)', '--border': 'oklch(1 0 0 / 10%)', '--text': 'oklch(0.985 0 0)', '--text-muted': 'oklch(0.708 0 0)', '--sidebar-bg': 'oklch(0.18 0 0)', '--accent-bg': 'oklch(0.269 0 0)' },
  },
];

const MODES: { id: ThemeMode; label: string; Icon: React.ElementType }[] = [
  { id: 'light',  label: 'Claro',   Icon: Sun     },
  { id: 'dark',   label: 'Oscuro',  Icon: Moon    },
  { id: 'system', label: 'Sistema', Icon: Monitor },
];

const LS_THEME     = 'unitools-theme';
const LS_MODE      = 'unitools-mode';
const LS_TOUR_DONE = 'unitools-tour-completed';

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'dark')  return true;
  if (mode === 'light') return false;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getVars(themeId: ThemeId, mode: ThemeMode): Record<string, string> {
  const def = THEMES.find(t => t.id === themeId) ?? THEMES[0];
  return resolveIsDark(mode) ? def.dark : def.light;
}

const NAV_ITEMS = [
  { label: 'Inicio',        icon: Home,          locked: false },
  { label: 'Documentos',    icon: FileText,       locked: true  },
  { label: 'Estudio',       icon: BookOpen,       locked: true  },
  { label: 'Universidad',   icon: GraduationCap,  locked: true  },
  { label: 'Investigación', icon: Microscope,     locked: true  },
  { label: 'Utilidades',    icon: Zap,            locked: true  },
];

const FEATURED_TOOLS = [
  { id: 'merge-pdf',    name: 'Unir PDF',         description: 'Combina múltiples PDFs en uno',  icon: GitMerge,  section: 'Documentos'   },
  { id: 'notes',        name: 'Notas rápidas',    description: 'Crea y gestiona notas',           icon: Clipboard, section: 'Estudio'      },
  { id: 'pomodoro',     name: 'Pomodoro',          description: 'Temporizador de estudio',         icon: Timer,     section: 'Estudio'      },
  { id: 'cite-apa',     name: 'Cita APA',          description: 'Genera citas en formato APA',     icon: Quote,     section: 'Investigación'},
  { id: 'word-counter', name: 'Contador palabras', description: 'Cuenta palabras y caracteres',    icon: Type,      section: 'Universidad'  },
  { id: 'flashcards',   name: 'Flashcards',        description: 'Tarjetas de estudio',             icon: Layers,    section: 'Estudio'      },
];

const CATEGORIES = [
  { key: 'documents',  label: 'Documentos',    icon: FileText,      color: '#0B61D8' },
  { key: 'study',      label: 'Estudio',       icon: BookOpen,      color: '#2ECC71' },
  { key: 'university', label: 'Universidad',   icon: GraduationCap, color: '#FF9F1C' },
  { key: 'research',   label: 'Investigación', icon: Microscope,    color: '#9B59B6' },
  { key: 'utilities',  label: 'Utilidades',    icon: Zap,           color: '#1ABC9C' },
  { key: 'ai',         label: 'IA Premium',    icon: Brain,         color: '#7C3AED' },
];

const PDF_TOOLS = ['Unir', 'Dividir', 'Comprimir', 'Rotar', 'Eliminar págs.', 'Ordenar', 'Imágenes a PDF', 'PDF a imágenes', 'Extraer texto', 'Numerar págs.', 'Organizar', 'OCR'];

// ── ThemeSwitcher ─────────────────────────────────────────────────────────────
function MockThemeSwitcher({
  theme, mode, setTheme, setMode,
}: {
  theme: ThemeId; mode: ThemeMode;
  setTheme: (t: ThemeId) => void;
  setMode:  (m: ThemeMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDark = resolveIsDark(mode);
  const ActiveIcon = isDark ? Moon : Sun;

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div className="relative" ref={ref} id="theme-switcher">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Cambiar tema"
        className="flex items-center justify-center h-7 w-7 rounded-md transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-bg)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <ActiveIcon className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-52 z-[200] rounded-lg shadow-2xl p-2"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="px-1 pb-1 text-[10px] font-normal select-none" style={{ color: 'var(--text-muted)' }}>Modo</p>
          <div className="flex gap-1 px-1 pb-2">
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => { setMode(id); setOpen(false); }}
                aria-label={label}
                className="flex-1 flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] transition-colors"
                style={{
                  background: mode === id ? 'var(--accent-bg)' : 'transparent',
                  color: mode === id ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: mode === id ? 500 : 400,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
          <p className="px-1 pb-1 pt-1 text-[10px] font-normal select-none" style={{ color: 'var(--text-muted)' }}>Color</p>
          <div className="grid grid-cols-4 gap-1 px-1 pb-1">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                aria-label={t.label}
                className="flex flex-col items-center gap-1 rounded-md p-1.5 text-[10px] transition-colors"
                style={{
                  background: theme === t.id ? 'var(--accent-bg)' : 'transparent',
                  color: theme === t.id ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: theme === t.id ? 500 : 400,
                }}
              >
                <span
                  className="h-5 w-5 rounded-full shadow-sm relative flex items-center justify-center"
                  style={{ background: t.swatch, border: '1px solid color-mix(in oklch, var(--border) 80%, transparent)' }}
                >
                  {theme === t.id && <Check className="h-3 w-3 text-white drop-shadow" />}
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

// ── Features (mock + driver.js tour) ─────────────────────────────────────────
export default function Features() {
  const [activeNav,   setActiveNav]   = useState('Inicio');
  const [lockedAlert, setLockedAlert] = useState<string | null>(null);
  const [theme, setThemeState] = useState<ThemeId>('blue');
  const [mode,  setModeState]  = useState<ThemeMode>('dark');

  useEffect(() => {
    const t = (localStorage.getItem(LS_THEME) as ThemeId)   || 'blue';
    const m = (localStorage.getItem(LS_MODE)  as ThemeMode) || 'dark';
    setThemeState(t);
    setModeState(m);
  }, []);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const h = () => setModeState('system');
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [mode]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t); localStorage.setItem(LS_THEME, t);
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m); localStorage.setItem(LS_MODE, m);
  }, []);

  const vars   = getVars(theme, mode);
  const isDark = resolveIsDark(mode);

  // ── Driver.js ──────────────────────────────────────────────────────────────
  const startTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayClickNext: false,
      popoverClass: 'driverjs-unitools',
      nextBtnText: 'Siguiente →',
      prevBtnText: '← Atrás',
      doneBtnText: 'Listo',
      steps: [
        {
          element: '#mock-container',
          popover: {
            title: 'Bienvenido a UniToolsML',
            description: 'Esta es la interfaz real de la app. Explora las funcionalidades antes de descargar.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#theme-switcher',
          popover: {
            title: '8 temas + modo claro/oscuro',
            description: 'Personalización completa. Pruébalo ahora mismo — es funcional.',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#nav-home',
          popover: {
            title: 'Local-First — tus datos no salen de tu PC',
            description: 'Sin servidores externos, sin telemetría, sin cuenta para lo esencial. Todo ocurre en tu máquina.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#nav-locked-group',
          popover: {
            title: '6 categorías de herramientas',
            description: 'Documentos, Estudio, Universidad, Investigación, Utilidades e IA Premium. Cada una con herramientas específicas para tu flujo académico.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#pdf-tools-section',
          popover: {
            title: 'PDF Engine — 12 operaciones con Rust',
            description: 'Unir, dividir, comprimir, rotar, OCR, extraer texto... Todo offline. Sin Adobe, sin subir archivos a ningún servidor.',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '#ai-premium-banner',
          popover: {
            title: 'IA Generativa — 10+ herramientas',
            description: 'Analiza PDFs, genera guías de estudio, flashcards automáticas, preguntas de examen, mejora redacción. 7 días gratis de prueba.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#featured-tools',
          popover: {
            title: 'Herramientas destacadas',
            description: 'Pomodoro, Citas APA/IEEE, Notas, Flashcards, Contador de palabras... 40+ herramientas en total, la mayoría completamente gratis.',
            side: 'top',
            align: 'center',
          },
        },
        {
          element: '#categories-section',
          popover: {
            title: 'Organizado por categorías',
            description: 'Citas académicas en APA e IEEE, flashcards con IA, investigación sin depender de Zotero. Todo en un solo lugar.',
            side: 'top',
            align: 'center',
          },
        },
      ],
      onDestroyStarted: () => {
        localStorage.setItem(LS_TOUR_DONE, '1');
        driverObj.destroy();
      },
    });
    driverObj.drive();
  }, []);

  // Auto-start si no se ha visto el tour
  useEffect(() => {
    const already = localStorage.getItem(LS_TOUR_DONE);
    if (already) return;
    const t = setTimeout(startTour, 1200);
    return () => clearTimeout(t);
  }, [startTour]);

  function handleNavClick(item: typeof NAV_ITEMS[0]) {
    if (item.locked) setLockedAlert(item.label);
    else { setActiveNav(item.label); setLockedAlert(null); }
  }

  return (
    <section id="features" className="relative py-28 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            Características
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Todo en una sola app, sin conexión a internet
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
            Diseñado para flujos de trabajo académicos reales. Las herramientas gratuitas funcionan sin cuenta. La IA generativa requiere tu propia API key o un plan Premium.
          </p>
        </div>

        {/* Tour button + mock wrapper */}
        <div className="relative">

          {/* Botón iniciar tour */}
          <div className="absolute -top-4 right-0 z-10">
            <button
              onClick={startTour}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Ver tour de funciones
            </button>
          </div>

          {/* Mock */}
          <div
            id="mock-container"
            className="relative rounded-xl border overflow-hidden shadow-[0_0_80px_-20px_rgba(99,102,241,0.25)]"
            style={{
              ...vars,
              background: 'var(--bg)',
              borderColor: 'var(--border)',
            } as React.CSSProperties}
          >
            {/* Window chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--border)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--border)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--border)' }} />
              <div className="ml-3 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded" style={{ background: 'var(--primary)' }}>
                  <GraduationCap className="w-3 h-3" style={{ color: 'var(--primary-fg)' }} />
                </span>
                <span className="text-xs font-semibold tracking-tight" style={{ color: 'var(--text-muted)' }}>UniToolsML</span>
                <span className="text-xs" style={{ color: 'var(--border)' }}>—</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>v0.1.0</span>
              </div>
            </div>

            {/* App shell */}
            <div className="relative flex" style={{ minHeight: '520px' }}>

              {/* Sidebar */}
              <aside
                className="hidden sm:flex flex-col w-[200px] shrink-0 border-r"
                style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border)' }}
              >
                <nav className="flex-1 py-3 px-2 space-y-0.5">
                  {NAV_ITEMS.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.label;
                    return (
                      <button
                        key={item.label}
                        id={idx === 0 ? 'nav-home' : idx === 1 ? 'nav-locked-group' : undefined}
                        onClick={() => handleNavClick(item)}
                        className="flex items-center justify-between w-full gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left"
                        style={{
                          background: isActive ? `color-mix(in oklch, var(--primary) 15%, transparent)` : 'transparent',
                          color: isActive ? 'var(--text)' : 'var(--text-muted)',
                          border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            className="w-4 h-4 shrink-0"
                            style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}
                          />
                          <span className="truncate">{item.label}</span>
                        </span>
                        {item.locked && <Lock className="w-2.5 h-2.5 shrink-0" style={{ color: 'var(--border)', opacity: 0.6 }} />}
                      </button>
                    );
                  })}
                </nav>
                <div className="border-t p-2" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setLockedAlert('IA Premium')}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>IA Premium</span>
                  </button>
                </div>
              </aside>

              {/* Main content */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ background: isDark ? 'color-mix(in oklch, var(--bg) 80%, transparent)' : 'var(--bg)' }}
              >
                {/* TopBar */}
                <div
                  className="flex items-center h-11 px-4 border-b"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Inicio</span>
                  <span className="mx-2 text-xs" style={{ color: 'var(--border)' }}>/</span>
                  <span className="text-xs font-medium flex-1" style={{ color: 'var(--text)' }}>Bienvenido a UniToolsML</span>
                  <MockThemeSwitcher theme={theme} mode={mode} setTheme={setTheme} setMode={setMode} />
                </div>

                <div className="px-4 py-5 space-y-6 max-w-3xl">

                  {/* Heading */}
                  <div>
                    <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>Bienvenido a UniToolsML</h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Rápido, sin rodeos. Hecho para estudiantes.</p>
                  </div>

                  {/* AI Premium banner */}
                  <button
                    id="ai-premium-banner"
                    onClick={() => setLockedAlert('IA Premium')}
                    className="relative overflow-hidden w-full flex items-center gap-4 p-4 rounded-xl text-left text-white transition-all border border-white/10"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9, #4F46E5)' }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-extrabold uppercase tracking-tight">PRUEBA</span>
                        <span className="bg-white text-violet-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">7 días gratis</span>
                      </div>
                      <p className="text-xs text-white/90">Activa tu prueba y desbloquea todas las herramientas de IA.</p>
                    </div>
                  </button>

                  {/* PDF tools */}
                  <div id="pdf-tools-section" className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      PDF Engine — 12 operaciones
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {PDF_TOOLS.map((tool) => (
                        <button
                          key={tool}
                          onClick={() => setLockedAlert('Documentos')}
                          className="px-2 py-1.5 rounded-md border text-[10px] font-mono text-center transition-colors"
                          style={{
                            background: 'var(--surface)',
                            borderColor: 'var(--border)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div id="categories-section" className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Categorías</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {CATEGORIES.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                          <button
                            key={cat.key}
                            onClick={() => setLockedAlert(cat.label)}
                            className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-colors text-center"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white" style={{ background: cat.color }}>
                              <CatIcon className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-[9px] font-medium leading-tight" style={{ color: 'var(--text-muted)' }}>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured tools */}
                  <div id="featured-tools" className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Herramientas destacadas</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {FEATURED_TOOLS.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <button
                            key={tool.id}
                            onClick={() => setLockedAlert(tool.section)}
                            className="flex flex-col gap-2 p-3 rounded-xl border transition-all text-left"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                          >
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-lg"
                              style={{
                                background: `color-mix(in oklch, var(--primary) 12%, transparent)`,
                                border: `1px solid color-mix(in oklch, var(--primary) 25%, transparent)`,
                              }}
                            >
                              <ToolIcon className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                            </span>
                            <div>
                              <p className="text-xs font-medium leading-tight" style={{ color: 'var(--text)' }}>{tool.name}</p>
                              <p className="text-[10px] mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>{tool.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Locked overlay */}
              {lockedAlert && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{
                    background: isDark ? 'oklch(0.141 0.005 285.823 / 80%)' : 'oklch(0.985 0 0 / 80%)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <div
                    className="relative mx-4 w-full max-w-xs rounded-2xl p-5 shadow-2xl border"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <button
                      onClick={() => setLockedAlert(null)}
                      className="absolute top-3 right-3 transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-2.5 rounded-xl"
                        style={{
                          background: `color-mix(in oklch, var(--primary) 12%, transparent)`,
                          border: `1px solid color-mix(in oklch, var(--primary) 25%, transparent)`,
                        }}
                      >
                        <Lock className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{lockedAlert}</p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Disponible en la app</p>
                      </div>
                    </div>
                    <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Esta sección está disponible en la aplicación completa. Descárgala gratis para acceder a todas las herramientas.
                    </p>
                    <a
                      href="/#stack"
                      onClick={() => setLockedAlert(null)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors"
                      style={{ background: 'var(--primary)', color: 'var(--primary-fg)' }}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Obtener acceso
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Glow reflection */}
          <div className="h-12 mx-8 bg-gradient-to-b from-indigo-500/10 to-transparent blur-xl rounded-b-full" />
        </div>

      </div>

      {/* Driver.js custom styles */}
      <style>{`
        .driver-popover.driverjs-unitools {
          background-color: #18181b;
          border: 1px solid #27272a;
          border-radius: 12px;
          color: #fafafa;
          max-width: 300px;
          padding: 16px;
        }
        .driver-popover.driverjs-unitools .driver-popover-title {
          font-size: 13px;
          font-weight: 600;
          color: #fafafa;
          margin-bottom: 6px;
        }
        .driver-popover.driverjs-unitools .driver-popover-description {
          font-size: 12px;
          color: #a1a1aa;
          line-height: 1.55;
        }
        .driver-popover.driverjs-unitools .driver-popover-progress-text {
          font-size: 11px;
          color: #71717a;
        }
        .driver-popover.driverjs-unitools button.driver-popover-next-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
        }
        .driver-popover.driverjs-unitools button.driver-popover-prev-btn {
          background: transparent;
          color: #a1a1aa;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
        }
        .driver-popover.driverjs-unitools button.driver-popover-close-btn {
          color: #71717a;
        }
        .driver-popover.driverjs-unitools .driver-popover-arrow-side-left.driver-popover-arrow {
          border-left-color: #27272a;
        }
        .driver-popover.driverjs-unitools .driver-popover-arrow-side-right.driver-popover-arrow {
          border-right-color: #27272a;
        }
        .driver-popover.driverjs-unitools .driver-popover-arrow-side-top.driver-popover-arrow {
          border-top-color: #27272a;
        }
        .driver-popover.driverjs-unitools .driver-popover-arrow-side-bottom.driver-popover-arrow {
          border-bottom-color: #27272a;
        }
      `}</style>
    </section>
  );
}
