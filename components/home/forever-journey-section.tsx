'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EditorialHeading } from '@/components/ui/editorial-heading';

const steps = [
  {
    number: '01',
    title: 'Create Your Story',
    description: 'Tell us who you are — values, background, and what you seek in a life partner.',
    icon: '👤',
    color: 'from-rose-400 to-pink-500',
  },
  {
    number: '02',
    title: 'Define Your Forever',
    description: 'Set your marriage intentions, lifestyle preferences, and cultural expectations.',
    icon: '💍',
    color: 'from-amber-400 to-orange-500',
  },
  {
    number: '03',
    title: 'Discover Alignment',
    description: 'Our AI surfaces people who share your values, goals, and vision for life.',
    icon: '🔍',
    color: 'from-violet-400 to-purple-500',
  },
  {
    number: '04',
    title: 'Connect Meaningfully',
    description: 'When interest is mutual, begin a conversation built on genuine understanding.',
    icon: '💬',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    number: '05',
    title: 'Build Forever',
    description: 'At your own pace, explore compatibility and write your next chapter together.',
    icon: '🏡',
    color: 'from-rose-500 to-rose-700',
  },
];

export function ForeverJourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative section-space overflow-hidden">
      {/* Dark burgundy romantic gradient background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, #261B2B 0%, #4A1A2E 35%, #7B244C 65%, #5A1A3A 100%)',
        }}
      />
      {/* Romantic glow orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {/* Glowing golden curved path */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <motion.path
            d="M100 100 C300 200, 400 50, 600 180 S900 300, 1100 200 S1300 100, 1400 250"
            stroke="url(#goldPath)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M100 100 C300 200, 400 50, 600 180 S900 300, 1100 200 S1300 100, 1400 250"
            stroke="url(#goldGlow)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="goldPath" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#C9A46A" stopOpacity="0" />
              <stop offset="50%" stopColor="#F7E8D6" stopOpacity="1" />
              <stop offset="100%" stopColor="#C9A46A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldGlow" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#C9A46A" stopOpacity="0" />
              <stop offset="50%" stopColor="#F7E8D6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C9A46A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Your Forever Journey"
          subtitle="A thoughtful path from first introduction to meaningful connection. Five steps toward building a life together."
          dark
        />

        {/* Desktop: steps along the golden path */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-center gap-8 mb-16 ${
                  i % 2 === 1 ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? 'text-right' : ''}`}>
                  <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/15 shadow-2xl hover:bg-white/15 transition-colors duration-300 max-w-sm">
                    <span className="text-5xl font-display font-bold text-amber-300/30 block mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-amber-50 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Milestone node on the path */}
                <div className="relative z-10 flex flex-shrink-0 flex-col items-center">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-2xl border-4 border-amber-200/30`}
                  >
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <motion.div
                    className="mt-2 h-3 w-3 rounded-full bg-amber-300"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-rose-400 to-transparent rounded-full" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-18"
              >
                <div
                  className={`absolute left-2 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg z-10 border-2 border-amber-200/40`}
                >
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15">
                  <h3 className="text-lg font-display font-bold text-amber-50 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
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
