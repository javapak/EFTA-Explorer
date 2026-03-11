import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export type NavView = 'Table view' | 'Entity-Relationship flow graph';

export type NavContextValue = {
  view: NavView;
  setView: Dispatch<SetStateAction<NavView>>;
};

const NavContext = createContext<NavContextValue | undefined>(undefined);

export function NavProvider({ value, children }: { value: NavContextValue; children: ReactNode }) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return ctx;
}
