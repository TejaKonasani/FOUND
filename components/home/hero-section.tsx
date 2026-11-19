'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { FoundButton } from '@/components/ui/found-button';
import { PetalRain } from '@/components/ui/petal-rain';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Sunset sky background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, #FCD5CE 0%, #F8B4A0 25%, #F48C94 50%, #C64B7A 75%, #7B244C 100%)',
        }}
      />
      {/* Sunset glow orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-amber-200/60 via-rose-300/40 to-transparent blur-3xl" />
        <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
      </div>

      {/* Hanging flowers top corners */}
      <svg
        className="absolute top-0 left-0 z-10 h-full w-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left hanging garland */}
        <g>
          <motion.path
            d="M60 0 C70 120, 40 200, 80 320 C100 400, 60 460, 90 540"
            stroke="#C9A46A"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          {[80, 160, 240, 320, 400, 480, 540].map((y, i) => (
            <motion.circle
              key={`l${i}`}
              cx={60 + (i % 2) * 20}
              cy={y}
              r={8 + (i % 3) * 2}
              fill={i % 2 === 0 ? '#F48C94' : '#FCD5CE'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </g>
        {/* Right hanging garland */}
        <g>
          <motion.path
            d="M1380 0 C1370 120, 1400 200, 1360 320 C1340 400, 1380 460, 1350 540"
            stroke="#C9A46A"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          {[80, 160, 240, 320, 400, 480, 540].map((y, i) => (
            <motion.circle
              key={`r${i}`}
              cx={1380 - (i % 2) * 20}
              cy={y}
              r={8 + (i % 3) * 2}
              fill={i % 2 === 0 ? '#F48C94' : '#FCD5CE'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </g>
      </svg>

      {/* Indian architecture silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1440 220" className="w-full h-40 sm:h-56" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B244C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#261B2B" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 220 L0 140 Q40 80 80 140 L120 140 Q140 60 180 140 L220 140 L220 100 Q260 40 300 100 L300 140 L360 140 Q380 90 420 140 L460 140 L460 110 Q500 50 540 110 L540 140 L600 140 Q640 70 680 140 L720 140 L720 90 Q760 30 800 90 L800 140 L860 140 Q880 80 920 140 L960 140 L960 100 Q1000 40 1040 100 L1040 140 L1100 140 Q1140 60 1180 140 L1220 140 L1220 110 Q1260 50 1300 110 L1300 140 L1360 140 Q1400 80 1440 140 L1440 220 Z"
            fill="url(#archGrad)"
          />
          {/* Domes */}
          <circle cx="160" cy="70" r="22" fill="#7B244C" />
          <circle cx="520" cy="90" r="18" fill="#7B244C" />
          <circle cx="760" cy="55" r="26" fill="#7B244C" />
          <circle cx="1020" cy="70" r="20" fill="#7B244C" />
          <circle cx="1260" cy="70" r="22" fill="#7B244C" />
        </svg>
      </div>

      {/* Falling rose petals */}
      <PetalRain />

      <div className="container-page relative z-20 flex min-h-[calc(100vh-6rem)] items-center">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Headline */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/25 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md border border-white/30"
            >
              <Sparkles className="h-4 w-4" />
              Where Understanding Becomes Forever
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 font-display font-bold leading-[1.05] text-white text-[clamp(2.75rem,7vw,4.5rem)] drop-shadow-lg"
            >
              <span className="block">Somewhere,</span>
              <span className="block text-amber-200">Your Forever</span>
              <span className="block">Is Waiting.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mb-10 text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow"
            >
              Discover meaningful connections built on shared values, genuine
              understanding, and dreams of a beautiful life together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <FoundButton href="/auth/register" variant="primary" size="lg" className="bg-white text-found-rose hover:bg-amber-50 shadow-2xl">
                Begin Your Forever
              </FoundButton>
              <FoundButton href="/how-it-works" variant="secondary" size="lg" className="bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 backdrop-blur-sm">
                Explore FOUND
              </FoundButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
                <span>AI Matching</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
                <span>Verified Profiles</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
                <span>Privacy First</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Couple illustration with glowing heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glowing heart backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[420px] w-[420px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(244,140,148,0.6) 0%, rgba(198,75,122,0.3) 40%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Large glowing heart outline */}
            <svg
              className="absolute h-80 w-80 text-rose-300/40"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <motion.path
                d="M100 180 C40 130 10 80 10 50 C10 20 35 5 60 20 C75 30 90 50 100 65 C110 50 125 30 140 20 C165 5 190 20 190 50 C190 80 160 130 100 180Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: 0.5 }}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            {/* Couple image */}
            <motion.div
              className="relative h-[420px] w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/assets/hero-couple.png"
                alt="Indian couple in traditional wedding attire"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent" />
            </motion.div>

            {/* Floating compatibility badges */}
            <motion.div
              className="absolute -left-4 top-16 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-2xl border border-rose-100"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-lg">💕</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-found-plum">Shared Values</p>
                  <p className="text-sm text-rose-600 font-bold">92% match</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-6 bottom-20 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-2xl border border-amber-100"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-found-plum">AI Insight</p>
                  <p className="text-sm text-rose-600 font-bold">High compatibility</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-white/80">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </motion.div>
    </section>
  );
}
