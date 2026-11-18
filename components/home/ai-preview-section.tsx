'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check, X, MessageCircle } from 'lucide-react';

export function AIPreviewSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-found-lavender/30 to-white">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-found-lavender/50 px-4 py-2 text-sm font-medium text-found-burgundy mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Assisted Matching
            </div>
            <h2 className="mb-6 text-section text-found-burgundy">
              Matching That <span className="gradient-text">Explains Itself</span>
            </h2>
            <p className="mb-8 text-body text-found-plum/70 leading-relaxed">
              Our matching engine doesn&apos;t just give you a score — it tells you
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
                  <span className="text-found-plum/80">{item}</span>
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
            <div className="card-premium relative">
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-found-lavender px-3 py-1 text-xs font-medium text-found-burgundy">
                <Sparkles className="h-3 w-3" />
                Illustrative Example
              </div>

              <div className="mt-4">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-found-plum/50">Compatibility</p>
                    <p className="text-3xl font-display font-bold gradient-text">87%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-found-plum/50">High alignment</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-found-blush p-4">
                    <p className="mb-2 text-sm font-medium text-found-burgundy">
                      What you share
                    </p>
                    <div className="space-y-2 text-sm text-found-plum/70">
                      <p>• Both value family involvement in daily life</p>
                      <p>• Similar marriage timeline (within 1-2 years)</p>
                      <p>• Aligned on work-life balance priorities</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-found-champagne/40 p-4">
                    <p className="mb-2 text-sm font-medium text-found-burgundy">
                      Worth discussing
                    </p>
                    <div className="space-y-2 text-sm text-found-plum/70">
                      <p>• Preferred city after marriage</p>
                      <p>• Approach to celebrating festivals</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-found-lavender/40 p-4">
                    <MessageCircle className="h-5 w-5 text-found-burgundy" />
                    <p className="text-sm text-found-plum/70">
                      <em>&quot;You both value family involvement and prefer similar
                      marriage timelines. One area worth discussing is your
                      preferred city after marriage.&quot;</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
