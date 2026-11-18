/**
 * Protected route wrapper.
 * Renders children only when the user is authenticated.
 * Redirects to login when unauthenticated.
 *
 * Note: Client-side guards are for UX only. Real authorization
 * must be enforced server-side via Firebase ID token verification.
 */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerified?: boolean;
  fallbackRedirect?: string;
  className?: string;
}

export function ProtectedRoute({
  children,
  requireEmailVerified = false,
  fallbackRedirect = '/auth/login',
  className,
}: ProtectedRouteProps) {
  const { user, loading, emailVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(fallbackRedirect);
      } else if (requireEmailVerified && !emailVerified) {
        router.replace('/auth/verify-email');
      }
    }
  }, [user, loading, emailVerified, router, fallbackRedirect, requireEmailVerified]);

  if (loading) {
    return (
      <div className={cn('flex min-h-screen items-center justify-center', className)}>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-found-rose/30 border-t-found-rose" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireEmailVerified && !emailVerified) {
    return null;
  }

  return <>{children}</>;
}
