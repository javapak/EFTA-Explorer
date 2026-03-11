import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type PaginationContextValue = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

export function PaginationProvider({
  value,
  children,
}: {
  value: PaginationContextValue;
  children: ReactNode;
}) {
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

export function usePagination() {
  const ctx = useContext(PaginationContext);
  if (!ctx) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return ctx;
}
