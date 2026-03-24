"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Loader, ArrowRight, Lock, BellRing } from 'lucide-react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'loading' | 'success' | 'error';
export type Platform = 'windows' | 'android' | 'play' | null;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface Props {
  platform?: Platform;
}

export default function Newsletter({ platform: initialPlatform = null }: Props) {
  const API_URL = 'https://unitoolsmllandingapi.tonyml.com';
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [touched, setTouched] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [visible, setVisible] = useState<boolean>(!!initialPlatform);

  useEffect(() => {
    // If mounted on a platform page and the hash requests the form, infer platform and show
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!visible && hash === '#newsletter') {
      // Infer platform from pathname when not provided
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/windows')) setPlatform('windows');
      else if (path.includes('/android')) setPlatform('android');
      else if (path.includes('/play')) setPlatform('play');
      setVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    // keep platform in sync if prop changes externally
    if (initialPlatform) {
      setPlatform(initialPlatform);
      setVisible(true);
    }
  }, [initialPlatform]);

  const isValid = validateEmail(email);
  const showError = touched && email.length > 0 && !isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage(null);
    if (!isValid) return;

    setState('loading');

    try {
      const platformToSend = platform ?? (typeof navigator !== 'undefined' && /android/.test(navigator.userAgent.toLowerCase()) ? 'android' : 'windows');
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, platform: platformToSend, updates }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const downloadUrl = data?.downloadUrl;
      if (downloadUrl) {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      setState('success');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error desconocido');
      setState('error');
    }
  };

  if (!visible) return null;

  return (
    <section id="newsletter" className="relative py-28 px-4">
      <div className="absolute inset-0 -z-10 bg-radial-glow opacity-60" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs">
          <BellRing className="w-3.5 h-3.5" />
          Lista de espera — Acceso anticipado gratuito
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
          Sé el primero en probarlo.
        </h2>

        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-lg mx-auto">
          Estamos en fase beta cerrada. Ingresa tu email y te notificaremos cuando tu acceso esté listo. Sin spam, nunca.
        </p>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-3 animate-fade-up">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-zinc-100">Estás en la lista.</p>
            <p className="text-sm text-zinc-500">
              Te escribiremos a <span className="text-zinc-300">{email}</span> cuando tu acceso esté disponible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="tu@universidad.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  disabled={state === 'loading'}
                  className={cn(
                    'h-11 text-base',
                    showError && 'border-red-500/60 focus-visible:ring-red-500'
                  )}
                  aria-describedby={showError ? 'email-error' : undefined}
                />
                {showError && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400 text-left">
                    Ingresa un email válido.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                disabled={state === 'loading'}
                className="h-11 shrink-0"
              >
                {state === 'loading' ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Unirme
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="mt-3 max-w-md mx-auto text-sm text-zinc-400 flex items-center gap-2">
              <input id="updates" type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} className="w-4 h-4 rounded-md" />
              <label htmlFor="updates">Quiero recibir actualizaciones</label>
            </div>

            {state === 'error' && errorMessage && (
              <p className="mt-3 text-sm text-red-400 text-center">{errorMessage}</p>
            )}

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-600">
              <Lock className="w-3 h-3" />
              Tu email nunca se compartirá con terceros.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
