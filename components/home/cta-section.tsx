'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FoundButton } from '@/components/ui/found-button';

const floatingWords = ['Forever', 'Together', 'Love', 'Understanding', 'Home'];

export function CTASection() {
  return (
    <section className="relative section-space bg-cinematic overflow-hidden">
      {/* Floating words */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {floatingWords.map((word, i) => (
          <motion.span
            key={i}
            className="absolute font-display font-light text-white/10 text-3xl sm:text-5xl max-sm:hidden whitespace-nowrap"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Intertwined line motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <motion.path
            d="M-50 300 C300 200, 600 400, 720 350 S1200 250, 1490 320"
            stroke="white"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
          />
          <motion.path
            d="M-50 320 C300 240, 600 380, 720 360 S1200 280, 1490 340"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="container-page relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
          >
            <Heart className="h-8 w-8 text-white fill-white" />
          </motion.div>

          <h2 className="mb-6 font-display font-bold text-white text-[clamp(2rem,6vw,4.5rem)] leading-tight">
            Your Forever Story Begins
            <br />
            With Being <span className="text-found-gold">FOUND</span>.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/85 leading-relaxed">
            Join FOUND and take the first step toward a relationship built on
            understanding, shared values, and lifelong commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FoundButton href="/auth/register" variant="primary" size="lg" className="bg-white text-found-rose shadow-2xl hover:shadow-3xl">
              Create Your FOUND Profile
            </FoundButton>
            <FoundButton href="/how-it-works" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white">
              Learn More
            </FoundButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
