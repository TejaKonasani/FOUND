'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-found-blush to-white px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <Logo className="mx-auto mb-8 h-12 w-auto" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-found-blush"
        >
          <Heart className="h-12 w-12 text-found-rose" />
        </motion.div>
        <h1 className="mb-4 text-6xl font-display font-bold text-found-burgundy">404</h1>
        <h2 className="mb-4 text-2xl font-display font-semibold text-found-plum">
          Page Not Found
        </h2>
        <p className="mb-8 text-found-plum/60">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
