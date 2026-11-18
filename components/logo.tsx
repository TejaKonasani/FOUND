'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

export function Logo({ className, showTagline = false, variant = 'default' }: LogoProps) {
  const colors = {
    default: {
      f: '#7B244C',
      o: 'url(#foundHeartGradient)',
      u: '#C64B7A',
      n: '#E85D7A',
      d: '#F47B9A',
    },
    white: {
      f: '#FFFFFF',
      o: 'url(#foundHeartGradientWhite)',
      u: '#FFFFFF',
      n: '#FFFFFF',
      d: '#FFFFFF',
    },
    dark: {
      f: '#261B2B',
      o: 'url(#foundHeartGradientDark)',
      u: '#261B2B',
      n: '#261B2B',
      d: '#261B2B',
    },
  };

  const c = colors[variant];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg
        width="180"
        height="52"
        viewBox="0 0 180 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FOUND"
        role="img"
      >
        <defs>
          <linearGradient id="foundHeartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7B244C" />
            <stop offset="50%" stopColor="#C64B7A" />
            <stop offset="100%" stopColor="#F47B9A" />
          </linearGradient>
          <linearGradient id="foundHeartGradientWhite" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F47B9A" />
          </linearGradient>
          <linearGradient id="foundHeartGradientDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#261B2B" />
            <stop offset="100%" stopColor="#7B244C" />
          </linearGradient>
        </defs>

        {/* F - structured serif */}
        <text
          x="4"
          y="38"
          fontFamily="var(--font-playfair), serif"
          fontSize="40"
          fontWeight="700"
          fill={c.f}
        >
          F
        </text>

        {/* O - heart symbol */}
        <g transform="translate(42, 6)">
          {/* Outer heart shape */}
          <path
            d="M16 38 C6 30 0 22 0 14 C0 6 6 0 14 0 C18 0 22 2 24 6 C26 2 30 0 34 0 C42 0 48 6 48 14 C48 22 42 30 32 38 L16 38 Z"
            fill={c.o}
            opacity="0.95"
          />
          {/* Inner loop */}
          <path
            d="M24 28 C18 24 14 20 14 15 C14 11 17 8 21 8 C23 8 24 9 24 11 C24 9 25 8 27 8 C31 8 34 11 34 15 C34 20 30 24 24 28 Z"
            fill="white"
            opacity="0.25"
          />
          {/* Center tiny heart */}
          <path
            d="M24 22 C21 20 19 18 19 15 C19 13 20 12 22 12 C23 12 24 13 24 14 C24 13 25 12 26 12 C28 12 29 13 29 15 C29 18 27 20 24 22 Z"
            fill="white"
            opacity="0.6"
          />
        </g>

        {/* U - modern sans */}
        <text
          x="92"
          y="38"
          fontFamily="var(--font-jakarta), sans-serif"
          fontSize="40"
          fontWeight="600"
          fill={c.u}
        >
          U
        </text>

        {/* N - fluid script */}
        <text
          x="118"
          y="38"
          fontFamily="var(--font-playfair), serif"
          fontSize="40"
          fontWeight="500"
          fontStyle="italic"
          fill={c.n}
        >
          N
        </text>

        {/* D - decorative script */}
        <text
          x="142"
          y="38"
          fontFamily="var(--font-playfair), serif"
          fontSize="40"
          fontWeight="600"
          fontStyle="italic"
          fill={c.d}
        >
          D
        </text>
      </svg>

      {showTagline && (
        <p
          className={cn(
            'mt-1 text-xs font-medium tracking-[0.2em] uppercase',
            variant === 'white' ? 'text-white/80' : 'text-found-plum/50'
          )}
        >
          Where Understanding Becomes Forever
        </p>
      )}
    </div>
  );
}
