'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';

const dimensions = [
  { label: 'Values', value: 92, color: 'from-rose-400 to-pink-500' },
  { label: 'Life Goals', value: 88, color: 'from-amber-400 to-orange-500' },
  { label: 'Lifestyle', value: 85, color: 'from-violet-400 to-purple-500' },
  { label: 'Family', value: 90, color: 'from-emerald-400 to-teal-500' },
  { label: 'Communication', value: 81, color: 'from-rose-500 to-rose-700' },
];

export function MatchingSection() {
  return (
    <section className="relative section-space bg-gradient-to-b from-white via-rose-50/40 to-amber-50/30 overflow-hidden">
      {/* Soft glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-10 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-1/4 left-10 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Matching That Explains Itself"
          subtitle="Our AI does not just give you a score — it tells you why. See shared values, aligned goals, and even the differences worth discussing."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Compatibility preview with circular indicator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Glass panel */}
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 p-8 shadow-2xl">
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                Compatibility Preview
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center gap-8">
                {/* Circular compatibility indicator */}
                <div className="relative h-44 w-44 flex-shrink-0">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke="#F3E8EE"
                      strokeWidth="10"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke="url(#compGrad)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 52 * 0.13 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="compGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C64B7A" />
                        <stop offset="100%" stopColor="#F47B9A" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-4xl font-display font-bold text-found-burgundy"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      87%
                    </motion.span>
                    <span className="text-xs text-found-rose font-medium">High Match</span>
                  </div>
                </div>

                {/* Profile avatars */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-white font-bold shadow-md">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-found-burgundy">Ananya, 28</p>
                      <p className="text-xs text-found-plum/50">Mumbai • Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center text-rose-500">
                      <span className="text-lg">💕</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold shadow-md">
                      R
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-found-burgundy">Rohan, 31</p>
                      <p className="text-xs text-found-plum/50">Pune • Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Progress bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-display font-bold text-found-burgundy mb-6">
              Where You Align
            </h3>
            {dimensions.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-found-plum">{d.label}</span>
                  <span className="text-sm font-bold text-found-rose">{d.value}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-rose-100 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${d.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + 0.1 * i, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-5 border border-rose-100">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm text-found-plum/80 italic leading-relaxed">
                  &ldquo;You both value family involvement and have similar marriage timelines.
                  One area worth discussing is your preferred city after marriage.&rdquo;
                </p>
              </div>
            </div>

            <p className="text-xs text-found-plum/40 italic text-center">
              Compatibility is a preference-alignment estimate, not a prediction of marriage success.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
