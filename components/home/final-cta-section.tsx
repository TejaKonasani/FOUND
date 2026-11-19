'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { FoundButton } from '@/components/ui/found-button';
import { PetalRain } from '@/components/ui/petal-rain';

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Romantic sunset background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(135deg, #7B244C 0%, #C64B7A 35%, #F48C94 65%, #F7C59F 100%)',
        }}
      />
      {/* Sunset glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-rose-400/30 blur-3xl" />
        <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
      </div>

      {/* Architectural silhouette */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 pointer-events-none">
        <svg viewBox="0 0 1440 160" className="w-full h-28" preserveAspectRatio="none">
          <path
            d="M0 160 L0 100 Q40 60 80 100 L120 100 Q140 40 180 100 L240 100 L240 70 Q280 30 320 70 L320 100 L380 100 Q400 60 440 100 L500 100 L500 80 Q540 40 580 80 L580 100 L640 100 Q680 50 720 100 L780 100 L780 60 Q820 20 860 60 L860 100 L920 100 Q940 60 980 100 L1040 100 L1040 80 Q1080 40 1120 80 L1120 100 L1180 100 Q1220 50 1260 100 L1320 100 L1320 70 Q1360 30 1400 70 L1400 100 L1440 100 L1440 160 Z"
            fill="#4A1A2E"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Hanging flowers */}
      <svg className="absolute top-0 left-0 w-full h-40 -z-10 pointer-events-none" viewBox="0 0 1440 160" preserveAspectRatio="xMidYMid slice">
        {[100, 300, 500, 720, 940, 1140, 1340].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="0" x2={x + (i % 2 ? 15 : -15)} y2={40 + (i % 3) * 20} stroke="#C9A46A" strokeWidth="2" opacity="0.6" />
            <circle cx={x + (i % 2 ? 15 : -15)} cy={40 + (i % 3) * 20} r={5 + (i % 2) * 3} fill={i % 2 ? '#F48C94' : '#FCD5CE'} opacity="0.8" />
            <circle cx={x + (i % 2 ? 10 : -10)} cy={30 + (i % 3) * 20} r={4} fill="#F7C59F" opacity="0.7" />
          </g>
        ))}
      </svg>

      {/* Falling petals */}
      <PetalRain />

      <div className="container-page relative z-10 text-center py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl"
          >
            <Heart className="h-10 w-10 text-white fill-white" />
          </motion.div>

          <h2 className="mb-6 font-display font-bold text-white text-[clamp(2.25rem,7vw,5rem)] leading-tight drop-shadow-lg">
            Your Forever Story Begins
            <br />
            With Being <span className="text-amber-200">FOUND</span>.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow">
            Join FOUND and take the first step toward a relationship built on
            understanding, shared values, and lifelong commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <FoundButton
              href="/auth/register"
              variant="primary"
              size="lg"
              className="bg-white text-found-rose hover:bg-amber-50 shadow-2xl hover:shadow-3xl"
            >
              <Sparkles className="h-5 w-5" />
              Create Your FOUND Profile
            </FoundButton>
            <FoundButton
              href="/how-it-works"
              variant="secondary"
              size="lg"
              className="bg-white/15 text-white border-2 border-white/50 hover:bg-white/25 backdrop-blur-sm"
            >
              Learn More
            </FoundButton>
          </div>
          <p className="mt-8 text-sm text-white/70">
            Free to join • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
