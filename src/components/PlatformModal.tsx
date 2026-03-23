import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { usePlatform, type Platform } from './PlatformProvider';
import Newsletter from '@/components/sections/Newsletter';

const OPTIONS: { id: Platform; label: string; subtitle: string; disabled?: boolean }[] = [
  { id: 'windows', label: 'Windows', subtitle: 'Instalador .exe — descarga directa' },
  { id: 'android', label: 'Android APK', subtitle: 'Descarga APK directo' },
  { id: 'play', label: 'Play Store', subtitle: 'Próximamente', disabled: true },
];

export default function PlatformModal() {
  const { modalOpen, setModalOpen, setPlatform } = usePlatform();
  const [selected, setSelected] = useState<Platform | null>(null);
  const [step, setStep] = useState<'select' | 'form'>('select');

  function onContinue() {
    if (!selected) return;
    setPlatform(selected);
    setStep('form');
  }

  return (
    <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setStep('select'); }}>
      <DialogContent>
        {step === 'select' ? (
          <>
            <DialogHeader>
              <h3 className="text-lg font-semibold text-zinc-100">Selecciona tu plataforma</h3>
              <p className="text-sm text-zinc-400">Elige la plataforma para obtener la descarga y el flujo apropiado.</p>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => !opt.disabled && setSelected(opt.id)}
                  disabled={opt.disabled}
                  className={`flex flex-col p-4 rounded-xl border transition-colors text-left ${opt.disabled ? 'opacity-50 cursor-not-allowed border-zinc-800' : selected === opt.id ? 'bg-indigo-600/10 border-indigo-500/40 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)]' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{opt.label}</p>
                      <p className="text-xs text-zinc-400 mt-1">{opt.subtitle}</p>
                    </div>
                    {opt.disabled && <span className="text-xs font-mono text-zinc-500">Próximamente</span>}
                  </div>
                </button>
              ))}
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="glow" size="sm" onClick={onContinue} disabled={!selected}>Continuar</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <h3 className="text-lg font-semibold text-zinc-100">Regístrate para recibir la descarga</h3>
              <p className="text-sm text-zinc-400">Envíanos tu email y recibirás la descarga automáticamente.</p>
            </DialogHeader>

            <Newsletter platform={selected} />

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => { setStep('select'); setPlatform(null); }}>Cambiar plataforma</Button>
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
