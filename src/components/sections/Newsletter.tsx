"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Lock } from 'lucide-react';

type State = 'idle' | 'loading' | 'error';
type Platform = 'windows' | 'android' | null;

function detectPlatformFromPathOrUA(): Platform {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/windows')) return 'windows';
  if (path.includes('/android')) return 'android';

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android')) return 'android';
  if (ua.includes('windows')) return 'windows';
  return null;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Newsletter({ platform: initialPlatform }: { platform?: Platform }) {
  const envAPI = import.meta.env.PUBLIC_API_URL as string | undefined;
  // allow runtime override if you inject a global (useful for some deployments)
  const runtimeAPI = typeof window !== 'undefined' ? (window as any).__PUBLIC_API_URL : undefined;
  const API_URL_RAW = envAPI ?? runtimeAPI ?? '';
  const [email, setEmail] = useState('');
  const [updates, setUpdates] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'info' | 'success' | 'warning' | 'error' | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(initialPlatform ?? null);
  const [visible, setVisible] = useState<boolean>(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot

  useEffect(() => {
    // Determine platform automatically; show form only when platform is known or hash explicitly requests it
    const p = initialPlatform ?? detectPlatformFromPathOrUA();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (p) {
      setPlatform(p);
      setVisible(true);
    } else if (hash === '#newsletter') {
      // If user explicitly requests the form via hash, reveal it (still try to detect platform)
      setPlatform(detectPlatformFromPathOrUA());
      setVisible(true);
    }
  }, [initialPlatform]);

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTouched(true);
    setErrorMessage(null);
    setFeedbackMessage(null);
    setFeedbackType(null);

    if (!validateEmail(email)) {
      setErrorMessage('Ingresa un email válido');
      return;
    }

    // Honeypot: if filled, silently abort
    if (website && website.trim().length > 0) return;

    const platformToSend = platform ?? detectPlatformFromPathOrUA() ?? 'windows';

    setState('loading');

    try {
      if (!API_URL_RAW) {
        setErrorMessage('El servicio de descargas no está disponible. Intenta de nuevo más tarde.');
        setState('error');
        return;
      }

      // Ensure endpoint ends with /join
      const base = API_URL_RAW.replace(/\/$/, '');
      const endpoint = base.match(/\/join$/i) ? base : `${base}/join`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, platform: platformToSend, updates, website }),
      });

      if (res.status === 429) {
        setErrorMessage('Has enviado demasiadas peticiones. Intenta de nuevo más tarde.');
        setState('error');
        return;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText || 'Error en el servidor');
        setErrorMessage(text || `Error ${res.status}`);
        setState('error');
        return;
      }

      const data = await res.json();
      const success = data?.success;
      const emailStatus = data?.emailStatus;
      const downloadUrl = data?.downloadUrl;

      if (!success || !downloadUrl) {
        setErrorMessage('Respuesta inválida del servidor');
        setState('error');
        return;
      }

      // Mostrar feedback según el estado del envío de email
      if (emailStatus === 'sent') {
        setFeedbackMessage('Correo enviado. Revisa tu bandeja.');
        setFeedbackType('success');
      } else if (emailStatus === 'failed') {
        setFeedbackMessage('No se pudo enviar el correo, pero puedes descargar desde el enlace.');
        setFeedbackType('warning');
      } else {
        setFeedbackMessage('Descarga lista. El correo no está configurado.');
        setFeedbackType('info');
      }

      // detener loading antes de iniciar la descarga
      setState('idle');
      window.location.href = downloadUrl;
    } catch (err: any) {
      setErrorMessage(err?.message ?? 'Ocurrió un error de red. Revisa tu conexión e intenta de nuevo.');
      setState('error');
    }
  };

  if (!visible) return null;

  return (
    <section id="newsletter" className="py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Descargar UniToolsML</h2>
        <p className="text-sm text-zinc-400 mb-6">Selecciona tu plataforma y descarga la herramienta ahora.</p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ display: 'none' }} autoComplete="off" />

          <Input
            type="email"
            placeholder="tu@universidad.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-label="Email"
            required
          />

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
              <span>Recibir actualizaciones</span>
            </label>

            <div className="text-sm text-zinc-500">Plataforma: <strong className="ml-1">{platform ?? 'Desconocida'}</strong></div>
          </div>

          {errorMessage && <p className="text-sm text-red-400 text-left">{errorMessage}</p>}
          {!errorMessage && feedbackMessage && (
            <p className={`text-sm text-left ${
              feedbackType === 'success' ? 'text-green-500' : feedbackType === 'warning' ? 'text-yellow-500' : 'text-blue-500'
            }`}>{feedbackMessage}</p>
          )}

          <Button type="submit" disabled={state === 'loading'} className="h-11 flex items-center justify-center gap-2">
            {state === 'loading' ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Descargar ahora'
            )}
          </Button>

          <p className="mt-2 text-xs text-zinc-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Tu email nunca se compartirá con terceros.
          </p>
        </form>
      </div>
    </section>
  );
}
