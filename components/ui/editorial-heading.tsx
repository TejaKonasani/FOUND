'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EditorialHeadingProps {
  title: string;
  subtitle?: string;
  gradientWord?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export function EditorialHeading({
  title,
  subtitle,
  gradientWord,
  align = 'center',
  className,
  dark,
}: EditorialHeadingProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  const titleColor = dark ? 'text-white' : 'text-found-burgundy';
  const subtitleColor = dark ? 'text-white/70' : 'text-found-plum/70';

  const words = title.split(' ');

  return (
    <div className={cn('flex flex-col', alignClass, className)}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className={cn(
          'font-display font-bold tracking-tight leading-[1.05] mb-5',
          'text-[clamp(2rem,5vw,3.75rem)]',
          titleColor
        )}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={cn(
              'inline-block mr-3',
              word === gradientWord && 'gradient-text'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {word}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn('text-body max-w-2xl leading-relaxed', subtitleColor, align === 'center' && 'mx-auto')}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
