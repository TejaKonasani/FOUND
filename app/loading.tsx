'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/logo';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-found-blush to-white">
      <Logo className="mb-8 h-12 w-auto" />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-3 w-32 rounded-full bg-found-rose/30"
      />
    </div>
  );
}
