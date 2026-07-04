import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Session } from "@/types";

const sessionStorageKey = "workforce-ai-session";

interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(() => {
    const stored = localStorage.getItem(sessionStorageKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as Session;
    } catch {
      return null;
    }
  });

  const setSession = (nextSession: Session | null) => {
    setSessionState(nextSession);
  };

  useEffect(() => {
    if (session) {
      localStorage.setItem(sessionStorageKey, JSON.stringify(session));
    } else {
      localStorage.removeItem(sessionStorageKey);
    }
  }, [session]);

  const value = useMemo(
    () => ({ session, setSession, isAuthenticated: Boolean(session) }),
    [session]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside SessionProvider.");
  return context;
}
