'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-rose" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="heart-deco top-10 left-[10%] text-white/10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-16 w-16 fill-current" />
        </motion.div>
        <motion.div
          className="heart-deco bottom-10 right-[15%] text-white/10"
          animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Heart className="h-12 w-12 fill-current" />
        </motion.div>
      </div>

      <div className="container-page relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 font-display text-section font-bold text-white sm:text-5xl">
            Your Forever Story Could Begin Here.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/85">
            Join FOUND and take the first step toward a relationship built on
            understanding, shared values, and lifelong commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="btn w-full sm:w-auto bg-white text-found-rose shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Your FOUND Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="btn w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
