'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Características', href: '/#features' },
  { label: 'Planes', href: '/#pricing' },
  { label: 'Distribución', href: '/#stack' },
  { label: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-zinc-800/80 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="UniToolsML">
          <div className="relative flex items-center justify-center w-8 h-8">
            <img src="/icono.ico" alt="UniToolsML" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            UniTools<span className="text-primary">ML</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/60"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA  */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="glow" size="sm" asChild>
            <a href="/#stack">
              <Zap className="w-3.5 h-3.5" />
              Obtener Acceso Anticipado
            </a>
          </Button>
        </div>

        {/* Mobile: theme + burger */}
        <div className="md:hidden flex items-center gap-1">
          {/* keep theme visible on mobile */}
          <ThemeSwitcher />
          <button
            className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-64 border-b border-zinc-800' : 'max-h-0'
        )}
      >
        <div className="glass px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              {l.label}
            </a>
          ))}
      
        </div>
      </div>
    </header>
  );
}
