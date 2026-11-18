'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface FoundPetalRainProps {
  /** Number of petals on screen at once */
  count?: number;
  /** Petal color — defaults to FOUND rose gradient */
  variant?: 'rose' | 'pink' | 'lavender' | 'gold' | 'multi';
  /** Whether petals should be visible at all (respects reduced-motion internally too) */
  enabled?: boolean;
  /** Additional wrapper classes */
  className?: string;
}

const PETAL_SVGS: Record<string, string> = {
  rose: '#C64B7A',
  pink: '#F47B9A',
  lavender: '#9B8FD8',
  gold: '#C9A46A',
};

/**
 * Signature FOUND falling-petals animation.
 * Renders lightweight SVG petals that drift down with randomized
 * duration, delay, drift, size, and horizontal start position.
 * Fully client-side, respects prefers-reduced-motion via CSS.
 */
export function FoundPetalRain({
  count = 18,
  variant = 'rose',
  enabled = true,
  className,
}: FoundPetalRainProps) {
  const petals = useMemo(() => {
    const arr: Array<{
      id: number;
      left: number;
      duration: number;
      delay: number;
      drift: number;
      size: number;
      color: string;
    }> = [];

    const colors =
      variant === 'multi'
        ? ['#C64B7A', '#F47B9A', '#9B8FD8', '#C9A46A', '#7B244C']
        : [PETAL_SVGS[variant] || PETAL_SVGS.rose];

    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 10, // 10–20s
        delay: Math.random() * 12,
        drift: -80 + Math.random() * 160, // -80 to +80px horizontal drift
        size: 10 + Math.random() * 12, // 10–22px
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, [count, variant]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      {petals.map((p) => (
        <svg
          key={p.id}
          className="animate-petal-fall"
          style={
            {
              left: `${p.left}%`,
              '--petal-duration': `${p.duration}s`,
              '--petal-delay': `-${p.delay}s`,
              '--petal-drift': `${p.drift}px`,
              width: p.size,
              height: p.size,
            } as React.CSSProperties
          }
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={p.color}
            opacity="0.75"
          />
        </svg>
      ))}
    </div>
  );
}
