'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingWordsProps {
  words: string[];
  className?: string;
  color?: string;
}

export function FloatingWords({ words, className, color = 'text-found-rose' }: FloatingWordsProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none select-none', className)}>
      {words.map((word, i) => {
        const fontSize = [
          'text-2xl sm:text-3xl',
          'text-xl sm:text-2xl',
          'text-lg sm:text-xl',
          'text-3xl sm:text-4xl',
          'text-xl sm:text-2xl',
          'text-2xl sm:text-3xl',
        ][i % 6];
        const left = [
          '5%', '15%', '25%', '70%', '80%', '88%',
          '12%', '45%', '65%', '92%', '35%', '55%',
        ][i % 12];
        const top = [
          '15%', '35%', '55%', '20%', '45%', '65%',
          '75%', '25%', '50%', '80%', '30%', '60%',
        ][i % 12];
        const delay = i * 0.8;
        const duration = 7 + (i % 4);

        return (
          <motion.span
            key={i}
            className={cn(
              'floating-word font-display font-light whitespace-nowrap',
              fontSize,
              color,
              'max-sm:hidden'
            )}
            style={{ left, top }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 3, -3, 0],
              opacity: [0.06, 0.12, 0.06],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
