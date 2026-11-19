'use client';

import { motion } from 'framer-motion';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

const features = [
  {
    title: 'Deep Understanding',
    description: 'We go far beyond photos. Our engine maps shared values, communication styles, and life goals to surface partners who truly align with you.',
    gradient: 'from-rose-400 via-pink-500 to-rose-600',
    bgAccent: 'bg-rose-50',
    accent: 'text-rose-600',
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <motion.path
          d="M32 54C32 54 10 38 10 22C10 12 18 6 26 10C30 12 32 16 32 16C32 16 34 12 38 10C46 6 54 12 54 22C54 38 32 54 32 54Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <circle cx="24" cy="24" r="4" fill="#C64B7A" />
        <circle cx="40" cy="24" r="4" fill="#C64B7A" />
        <motion.path
          d="M26 34C28 38 36 38 38 34"
          stroke="#C64B7A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
    illustration: (
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-4xl">💞</span>
      </div>
    ),
  },
  {
    title: 'Rooted in Tradition',
    description: 'Honor your cultural heritage. Whether it is festivals, rituals, or family customs — find someone who respects and shares your traditions.',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    bgAccent: 'bg-amber-50',
    accent: 'text-amber-600',
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <motion.path
          d="M32 8L8 20V44L32 56L56 44V20L32 8Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <circle cx="32" cy="32" r="8" fill="#C9A46A" />
        <motion.path
          d="M32 20V44M20 32H44"
          stroke="#C9A46A"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </svg>
    ),
    illustration: (
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-4xl">🪔</span>
      </div>
    ),
  },
  {
    title: 'Transparent AI',
    description: 'No black box. See exactly why two people are recommended — shared values, aligned goals, and even the differences worth discussing.',
    gradient: 'from-violet-400 via-purple-500 to-pink-500',
    bgAccent: 'bg-violet-50',
    accent: 'text-violet-600',
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <motion.rect
          x="12" y="16" width="40" height="32" rx="6"
          fill="white"
          stroke="white"
          strokeWidth="2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M20 28H44M20 36H36"
          stroke="#7C3AED"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <circle cx="42" cy="24" r="3" fill="#F47B9A" />
      </svg>
    ),
    illustration: (
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-4xl">✨</span>
      </div>
    ),
  },
  {
    title: 'Privacy & Safety',
    description: 'Your data stays yours. Mutual-interest messaging, private photos, and full control over who sees your profile. Trust is built in.',
    gradient: 'from-emerald-400 via-teal-500 to-rose-500',
    bgAccent: 'bg-emerald-50',
    accent: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <motion.path
          d="M32 8L12 18V32C12 44 20 54 32 58C44 54 52 44 52 32V18L32 8Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M24 32L30 38L42 26"
          stroke="#059669"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
    illustration: (
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-4xl">🛡️</span>
      </div>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section className="relative section-space bg-gradient-to-b from-rose-50 via-white to-amber-50/50 overflow-hidden">
      <OrganicShapes variant="warm" />
      <div className="grain" />

      <div className="container-page relative z-10">
        <EditorialHeading
          title="What Makes FOUND Different"
          subtitle="We're not another swiping app. FOUND is built for adults who want a meaningful, lifelong partnership — rooted in understanding, not just attraction."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-rose-100/50 min-h-[280px] flex flex-col">
                {/* Gradient top band */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient}`} />

                {/* Decorative corner illustration */}
                {feature.illustration}

                {/* Icon in gradient circle */}
                <div
                  className={`relative z-10 mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-105 transition-transform duration-500`}
                >
                  {feature.icon}
                </div>

                <h3 className="relative z-10 mb-3 text-2xl font-display font-bold text-found-burgundy">
                  {feature.title}
                </h3>
                <p className="relative z-10 flex-1 text-body text-found-plum/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom gradient line animation */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-700 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
