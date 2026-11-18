/**
 * Firebase Authentication context and provider.
 * Provides auth state to the entire app via React Context.
 */
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  sendEmailVerification,
  reload as reloadUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  emailVerified: boolean;
  displayName: string | null;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setEmailVerified(!!user?.emailVerified);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  const resendVerification = useCallback(async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (auth.currentUser) {
      await reloadUser(auth.currentUser);
      setEmailVerified(auth.currentUser.emailVerified);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        emailVerified,
        displayName: user?.displayName ?? null,
        signOut,
        resendVerification,
        refreshUser,
      }}
    >
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
