'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
  opacity: number;
}

/**
 * Continuous falling rose petals animation.
 * - Heart-shaped rose petals fall from the top, drifting and rotating.
 * - pointer-events: none so it never blocks clicks.
 * - Respects prefers-reduced-motion.
 * - Optimized: limited petal count, CSS-driven animation.
 */
export function PetalRain() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const petals = useMemo<Petal[]>(() => {
    const count = 28;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      drift: -40 + Math.random() * 80,
      rotation: Math.random() * 360,
      opacity: 0.55 + Math.random() * 0.4,
    }));
  }, []);

  if (prefersReduced) return null;

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-8"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: -60, x: 0, rotate: p.rotation }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift, 0],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.duration / 2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}
        >
          {/* Heart-shaped rose petal SVG */}
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 21C12 21 3 14.5 3 8.5C3 5 5.5 3 8 3C9.5 3 11 4 12 5.5C13 4 14.5 3 16 3C18.5 3 21 5 21 8.5C21 14.5 12 21 12 21Z"
              fill="#F48C94"
              stroke="#C64B7A"
              strokeWidth="0.5"
            />
            <path
              d="M12 6C12 6 10 5 8.5 5.5C7 6 6.5 7.5 7 9"
              stroke="#FCD5CE"
              strokeWidth="0.6"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
