'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

export function AIPreviewSection() {
  return (
    <section className="relative section-space bg-dark-plum overflow-hidden">
      <OrganicShapes variant="dark" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-found-rose/10 to-found-lavender/5 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-found-rose backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4" />
              Matching That Understands More
            </div>
            <h2 className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold text-white leading-tight">
              Matching That{' '}
              <span className="gradient-text">Explains Itself</span>
            </h2>
            <p className="mb-8 text-body text-white/70 leading-relaxed">
              Our matching engine does not just give you a score — it tells you
              <em> why</em>. See shared values, aligned goals, and even the
              differences worth discussing, all in plain language.
            </p>

            <ul className="space-y-4">
              {[
                'Transparent weighted scoring across 7 compatibility areas',
                'Respects your must-have requirements',
                'AI-generated explanations you can actually understand',
                'No black box — you see exactly what drives a match',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-rose">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="card-layered relative bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-found-lavender/90 px-3 py-1 text-xs font-medium text-found-burgundy">
                <Sparkles className="h-3 w-3" />
                Illustrative Example
              </div>

              <div className="mt-4">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/50">Compatibility</p>
                    <p className="text-4xl font-display font-bold gradient-text">87%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50">High alignment</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-white/10 p-4 border border-white/5">
                    <p className="mb-2 text-sm font-medium text-found-gold">What you share</p>
                    <div className="space-y-2 text-sm text-white/70">
                      <p>• Both value family involvement in daily life</p>
                      <p>• Similar marriage timeline (within 1-2 years)</p>
                      <p>• Aligned on work-life balance priorities</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                    <p className="mb-2 text-sm font-medium text-found-gold">Worth discussing</p>
                    <div className="space-y-2 text-sm text-white/70">
                      <p>• Preferred city after marriage</p>
                      <p>• Approach to celebrating festivals</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-found-lavender/10 p-4 border border-found-lavender/20">
                    <Sparkles className="h-5 w-5 text-found-rose flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/70 italic">
                      &ldquo;You both value family involvement and prefer similar marriage
                      timelines. One area worth discussing is your preferred city after
                      marriage.&rdquo;
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/40 italic text-center">
                  Compatibility is a preference-alignment estimate, not a prediction of marriage success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
