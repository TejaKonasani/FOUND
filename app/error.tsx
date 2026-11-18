'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-found-blush to-white px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <Logo className="mx-auto mb-8 h-12 w-auto" />
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-found-rose/60" />
        <h1 className="mb-4 text-3xl font-display font-bold text-found-burgundy">
          Something Went Wrong
        </h1>
        <p className="mb-8 text-found-plum/60">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
