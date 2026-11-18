'use client';

import { cn } from '@/lib/utils';

interface OrganicShapesProps {
  className?: string;
  variant?: 'soft' | 'warm' | 'dark';
}

export function OrganicShapes({ className, variant = 'soft' }: OrganicShapesProps) {
  const colors = {
    soft: 'from-found-rose/10 to-found-pink/5',
    warm: 'from-found-champagne/40 to-found-rose/15',
    dark: 'from-found-rose/15 to-found-lavender/10',
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden -z-0 pointer-events-none', className)}>
      <div
        className={cn(
          'organic-shape w-[600px] h-[600px] bg-gradient-to-br',
          colors[variant],
          'top-[-200px] -left-200px'
        )}
        style={{ top: -200, left: -200 }}
      />
      <div
        className={cn(
          'organic-shape w-[500px] h-[500px] bg-gradient-to-tr',
          colors[variant],
          'bottom-[-150px] -right-200px'
        )}
        style={{ bottom: -150, right: -200 }}
      />
      <div
        className={cn(
          'organic-shape w-[300px] h-[300px] bg-gradient-to-bl',
          colors[variant],
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      />
    </div>
  );
}
