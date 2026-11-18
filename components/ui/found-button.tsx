'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FoundButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function FoundButton({
  variant = 'primary',
  href,
  onClick,
  children,
  className,
  size = 'md',
  disabled,
}: FoundButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-[15px]',
    lg: 'px-9 py-4 text-base',
  };

  const baseClass = cn(
    'found-btn group relative inline-flex items-center gap-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
    sizeClasses[size],
    variant === 'primary' && 'found-btn-primary',
    variant === 'secondary' && 'found-btn-secondary',
    variant === 'outline' && 'found-btn-outline',
    className
  );

  const arrow = (
    <span className="found-btn-arrow">
      <ArrowRight className="h-4 w-4" />
    </span>
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} disabled={disabled}>
      {content}
    </button>
  );
}

interface HeartButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export function HeartButton({ isFavorite, onToggle, className }: HeartButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isFavorite
          ? 'bg-gradient-rose text-white shadow-glow'
          : 'bg-white/80 text-found-rose/60 border border-found-rose/20 hover:border-found-rose/40 hover:shadow-soft',
        className
      )}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        key={isFavorite ? 'active' : 'inactive'}
        initial={isFavorite ? { scale: 0.5, opacity: 0 } : {}}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Heart
          className={cn('h-5 w-5', isFavorite && 'fill-current')}
        />
      </motion.div>
    </button>
  );
}
