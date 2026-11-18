'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Heart, Search, MessageCircle, BookOpen } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';
import Link from 'next/link';
import { FoundButton } from '@/components/ui/found-button';

const milestones = [
  {
    icon: User,
    number: '01',
    title: 'Discover Yourself',
    description: 'Tell us who you are — your values, background, and what you seek in a life partner.',
    side: 'left' as const,
  },
  {
    icon: Heart,
    number: '02',
    title: 'Define Your Forever',
    description: 'Set your marriage intentions, lifestyle preferences, and cultural expectations.',
    side: 'right' as const,
  },
  {
    icon: Search,
    number: '03',
    title: 'Find Meaningful Alignment',
    description: 'Our matching engine surfaces people aligned with your values and goals.',
    side: 'left' as const,
  },
  {
    icon: MessageCircle,
    number: '04',
    title: 'Begin Understanding',
    description: 'Connect through secure messaging when there is mutual interest.',
    side: 'right' as const,
  },
  {
    icon: BookOpen,
    number: '05',
    title: 'Choose Your Next Chapter',
    description: 'At your own pace, explore compatibility and build a foundation for forever.',
    side: 'left' as const,
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative section-space bg-burgundy-plum overflow-hidden">
      <OrganicShapes variant="dark" />

      {/* Glowing path */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M-50 150 C200 100, 400 300, 720 280 S1100 120, 1490 200"
            stroke="url(#path1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M-50 400 C250 350, 450 500, 720 460 S1150 320, 1490 420"
            stroke="url(#path2)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M-50 650 C200 600, 500 750, 720 680 S1200 550, 1490 640"
            stroke="url(#path3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 3.5, delay: 1, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="path1" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#F47B9A" stopOpacity="0" />
              <stop offset="50%" stopColor="#F47B9A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F47B9A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="path2" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#C64B7A" stopOpacity="0" />
              <stop offset="50%" stopColor="#C64B7A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C64B7A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="path3" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#C9A46A" stopOpacity="0" />
              <stop offset="50%" stopColor="#C9A46A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C9A46A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-page relative z-10">
        <EditorialHeading
          title="The FOUND Forever Path"
          subtitle="Two lives gradually coming together. A thoughtful journey from first introduction to meaningful connection."
          dark
        />

        {/* Desktop: winding path layout */}
        <div className="mt-20 hidden lg:block relative">
          <div className="relative">
            {milestones.map((m, i) => (
              <motion.div
                key={m.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`flex items-center gap-8 mb-12 ${
                  m.side === 'right' ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className={`flex-1 ${m.side === 'right' ? 'text-right' : ''}`}>
                  <div className="card-journey inline-block">
                    <span className="text-5xl font-display font-bold text-found-rose/20 block mb-2">
                      {m.number}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-white mb-2">
                      {m.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Milestone node */}
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-rose shadow-glow">
                  <m.icon className="h-7 w-7 text-white" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-found-gold text-[10px] font-bold text-found-plum">
                    {i + 1}
                  </span>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-found-rose via-found-rose/50 to-transparent" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-rose shadow-glow z-10">
                  <span className="text-[10px] font-bold text-white">{i + 1}</span>
                </div>
                <div className="card-journey">
                  <h3 className="text-lg font-display font-semibold text-white mb-1">
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <FoundButton href="/auth/register" variant="primary" size="lg">
            Begin Your Journey
          </FoundButton>
        </div>
      </div>
    </section>
  );
}
