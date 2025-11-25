'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';
import { User, authApi } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store for initialization status
let initLoadingDone = false;
const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getSnapshot() {
  return initLoadingDone;
}

function getServerSnapshot() {
  return false;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const initializedRef = useRef(false);
  
  const isInitDone = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const loading = !isInitDone;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          initLoadingDone = true;
          subscribers.forEach(cb => cb());
        });
    } else {
      initLoadingDone = true;
      subscribers.forEach(cb => cb());
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    localStorage.setItem('token', response.access_token);
    setUser(response.user);
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    const response = await authApi.register(email, password, name);
    localStorage.setItem('token', response.access_token);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
