'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const gold = '#F4C878';
const goldDark = '#C9A46A';
const rose = '#C64B7A';

const steps = [
  {
    number: 1,
    title: 'Discover Yourself',
    description: 'Reflect on your values, dreams, and the qualities that define you.',
    icon: 'book-heart',
  },
  {
    number: 2,
    title: 'Define Your Forever',
    description: 'Set your marriage intentions, lifestyle preferences, and cultural expectations.',
    icon: 'checklist',
  },
  {
    number: 3,
    title: 'Find Meaningful Alignment',
    description: 'Our AI surfaces people who share your values, goals, and vision for life.',
    icon: 'infinity-heart',
  },
  {
    number: 4,
    title: 'Begin Understanding',
    description: 'When interest is mutual, begin a conversation built on genuine connection.',
    icon: 'chat',
  },
  {
    number: 5,
    title: 'Choose Your Next Chapter',
    description: 'At your own pace, explore compatibility and write your story together.',
    icon: 'mandap',
  },
];

function JourneyIcon({ type, className }: { type: string; className?: string }) {
  const gold = '#F4C878';
  const goldDark = '#C9A46A';
  const rose = '#C64B7A';
  const white = '#FFFFFF';

  switch (type) {
    case 'book-heart':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
          </defs>
          {/* Open book */}
          <path d="M12 18 C12 18 20 14 32 14 C44 14 52 18 52 18 L52 48 C52 48 44 44 32 44 C20 44 12 48 12 48 Z"
            stroke="url(#goldGrad1)" strokeWidth="2.5" fill="none" />
          <path d="M32 14 L32 44" stroke="url(#goldGrad1)" strokeWidth="2" />
          <path d="M12 18 L12 48" stroke="url(#goldGrad1)" strokeWidth="2" />
          <path d="M52 18 L52 48" stroke="url(#goldGrad1)" strokeWidth="2" />
          {/* Glowing heart on book */}
          <path d="M32 30 C28 26 24 23 24 20 C24 17 26 16 28 16 C29 16 30 17 32 19 C34 17 35 16 36 16 C38 16 40 17 40 20 C40 23 36 26 32 30Z"
            fill={rose} opacity="0.9" />
        </svg>
      );
    case 'checklist':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
          </defs>
          {/* Clipboard */}
          <rect x="16" y="12" width="32" height="44" rx="4"
            stroke="url(#goldGrad2)" strokeWidth="2.5" fill="none" />
          <rect x="24" y="8" width="16" height="8" rx="2"
            stroke="url(#goldGrad2)" strokeWidth="2" fill="none" />
          {/* Checkmarks */}
          <path d="M22 26 L26 30 L34 22" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 36 L26 40 L34 32" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 46 L26 50 L34 42" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'infinity-heart':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGrad3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
            <radialGradient id="heartGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor={rose} stopOpacity="0.6" />
              <stop offset="100%" stopColor={rose} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Glow */}
          <circle cx="32" cy="32" r="24" fill="url(#heartGlow)" />
          {/* Infinity loop */}
          <path d="M16 32 C16 24 24 20 32 32 C40 44 48 40 48 32 C48 24 40 20 32 32 C24 44 16 40 16 32Z"
            stroke="url(#goldGrad3)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Center heart */}
          <path d="M32 28 C29 25 27 23 27 21 C27 19 28 18 30 18 C31 18 32 19 32 20 C32 19 33 18 34 18 C36 18 37 19 37 21 C37 23 35 25 32 28Z"
            fill={rose} />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGrad4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
          </defs>
          {/* Left bubble */}
          <path d="M12 18 C12 14 16 12 20 12 L34 12 C38 12 42 14 42 18 L42 32 C42 36 38 38 34 38 L22 38 L14 46 L14 38 C12 38 12 36 12 32 Z"
            stroke="url(#goldGrad4)" strokeWidth="2.5" fill="none" />
          {/* Right bubble */}
          <path d="M22 26 C22 24 24 22 26 22 L30 22" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 30 C22 28 24 26 26 26 L30 26" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 34 C22 32 24 30 26 30 L28 30" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          {/* Small heart in conversation */}
          <path d="M44 28 C42.5 26.5 41 25.5 41 24.5 C41 23.5 42 23 43 23 C43.5 23 44 23.5 44 24 C44 23.5 44.5 23 45 23 C46 23 47 23.5 47 24.5 C47 25.5 45.5 26.5 44 28Z"
            fill={rose} opacity="0.8" />
        </svg>
      );
    case 'mandap':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGrad5" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
          </defs>
          {/* Pillars */}
          <rect x="14" y="20" width="4" height="32" rx="1" fill="url(#goldGrad5)" />
          <rect x="46" y="20" width="4" height="32" rx="1" fill="url(#goldGrad5)" />
          {/* Roof arch */}
          <path d="M12 22 C12 22 18 10 32 10 C46 10 52 22 52 22"
            stroke="url(#goldGrad5)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M12 22 L52 22" stroke="url(#goldGrad5)" strokeWidth="2.5" />
          {/* Decorative top */}
          <path d="M32 6 L32 12" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="5" r="2" fill={rose} />
          {/* Hanging decorations */}
          <path d="M22 22 L22 28" stroke={gold} strokeWidth="1.5" />
          <circle cx="22" cy="30" r="2" fill={rose} opacity="0.8" />
          <path d="M32 22 L32 30" stroke={gold} strokeWidth="1.5" />
          <circle cx="32" cy="32" r="2.5" fill={rose} />
          <path d="M42 22 L42 28" stroke={gold} strokeWidth="1.5" />
          <circle cx="42" cy="30" r="2" fill={rose} opacity="0.8" />
          {/* Base */}
          <rect x="10" y="50" width="44" height="3" rx="1.5" fill="url(#goldGrad5)" />
        </svg>
      );
    default:
      return null;
  }
}

export function ForeverJourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Path coordinates for the flowing golden wave through 5 steps
  // Desktop: horizontal wave; Mobile: vertical line handled separately
  const pathD = 'M80 200 C200 100, 280 300, 420 200 S640 100, 780 200 S1000 300, 1140 200 S1360 100, 1400 200';

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Dark romantic burgundy gradient background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(120deg, #430D35 0%, #641344 50%, #8D285A 100%)',
        }}
      />
      {/* Romantic glow orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-pink-500/8 blur-3xl" />
      </div>

      {/* Glowing golden curved path (desktop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <svg className="absolute top-0 left-0 w-full h-[500px]" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid meet">
          <motion.path
            d={pathD}
            stroke="url(#journeyGoldPath)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <motion.path
            d={pathD}
            stroke="url(#journeyGoldGlow)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="journeyGoldPath" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor={gold} stopOpacity="0.3" />
              <stop offset="50%" stopColor={gold} stopOpacity="1" />
              <stop offset="100%" stopColor={gold} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="journeyGoldGlow" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor={gold} stopOpacity="0" />
              <stop offset="50%" stopColor={gold} stopOpacity="0.5" />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-page relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold tracking-wide leading-[1.1] mb-5 text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.04em',
              textShadow: '0 2px 20px rgba(244,200,120,0.2)',
            }}
          >
            The FOUND Forever Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            A thoughtful path from first introduction to meaningful connection.
            Five steps toward building a life together.
          </motion.p>
        </div>

        {/* Desktop: five steps horizontally along the golden wave */}
        <div className="hidden lg:block">
          <div className="relative h-[500px]">
            {steps.map((step, i) => {
              // Horizontal positions along the wave
              const positions = [
                { x: 80, y: 200, textDir: 'right' as const },
                { x: 420, y: 200, textDir: 'left' as const },
                { x: 720, y: 200, textDir: 'right' as const },
                { x: 1020, y: 200, textDir: 'left' as const },
                { x: 1360, y: 200, textDir: 'left' as const },
              ];
              const pos = positions[i];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className="absolute"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Icon node with glow */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#2A0A22] border-2 border-[#F4C878]/50 shadow-[0_0_30px_rgba(244,200,120,0.3)]"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(244,200,120,0.5)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#F4C878]/10 blur-xl" />
                      <JourneyIcon type={step.icon} className="h-14 w-14 relative z-10" />
                    </motion.div>
                    {/* Step number badge */}
                    <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C878] text-[#430D35] text-xs font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Text card */}
                  <div
                    className={`mt-6 w-56 ${
                      isEven ? 'ml-20' : 'mr-20'
                    }`}
                  >
                    <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-[#F4C878]/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                      <h3
                        className="font-display font-bold text-[#F4C878] mb-2 text-xl"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: vertical connected timeline */}
        <div className="lg:hidden relative">
          {/* Vertical golden line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F4C878] via-[#C9A46A] to-transparent rounded-full" />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-24"
              >
                {/* Icon node */}
                <div
                  className="absolute left-4 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-[#2A0A22] border-2 border-[#F4C878]/50 shadow-[0_0_20px_rgba(244,200,120,0.25)] z-10"
                >
                  <JourneyIcon type={step.icon} className="h-9 w-9" />
                </div>
                {/* Step number */}
                <div className="absolute left-20 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C878] text-[#430D35] text-[10px] font-bold">
                  {step.number}
                </div>
                {/* Text card */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-[#F4C878]/20">
                  <h3
                    className="font-display font-bold text-[#F4C878] mb-2 text-lg"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
