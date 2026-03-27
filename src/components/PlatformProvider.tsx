import * as React from 'react';


export type Platform = 'windows' | 'android' | 'apple';

interface PlatformContextValue {
  platform: Platform | null;
  setPlatform: (p: Platform | null) => void;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
}

const PlatformContext = React.createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = React.useState<Platform | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <PlatformContext.Provider value={{ platform, setPlatform, modalOpen, setModalOpen }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = React.useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider');
  return ctx;
}

export default PlatformProvider;
