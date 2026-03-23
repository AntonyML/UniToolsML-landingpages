import * as React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children, className, ...props }: DialogProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false);
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center px-4', className)} {...props}>
      <div className="fixed inset-0 bg-black/60" onClick={() => onOpenChange(false)} />
      <div role="dialog" aria-modal="true" className="relative max-w-xl w-full">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-zinc-950/90 border border-zinc-800 rounded-xl p-6 backdrop-blur-md', className)} {...props}>
      {children}
    </div>
  );
}

export function DialogHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex justify-end gap-2', className)} {...props}>
      {children}
    </div>
  );
}

export default Dialog;
