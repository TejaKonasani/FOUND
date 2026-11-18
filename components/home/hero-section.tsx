'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FloatingWords } from '@/components/ui/floating-words';
import { OrganicShapes } from '@/components/ui/organic-shapes';
import { FoundButton } from '@/components/ui/found-button';

const floatingWords = ['Understanding', 'Together', 'Forever', 'Trust', 'Belonging', 'Two Hearts', 'One Journey'];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero pt-28 pb-16">
      <FloatingWords words={floatingWords} />
      <OrganicShapes variant="soft" />

      {/* Decorative connecting lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1440 900" fill="none">
          <motion.path
            d="M100 200 C300 100, 500 300, 720 250 S1100 150, 1340 280"
            stroke="url(#line1)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M80 500 C250 450, 450 550, 720 500 S1150 420, 1360 520"
            stroke="url(#line2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, delay: 1 }}
          />
          <defs>
            <linearGradient id="line1" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#C64B7A" stopOpacity="0" />
              <stop offset="50%" stopColor="#F47B9A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C64B7A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line2" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#7B244C" stopOpacity="0" />
              <stop offset="50%" stopColor="#C64B7A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7B244C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-page relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Editorial headline */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-found-rose shadow-soft backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              Where Understanding Becomes Forever
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 font-display font-bold leading-[1.05] text-[clamp(2.75rem,7vw,6rem)]"
            >
              <span className="block text-found-plum">Somewhere,</span>
              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Your Forever
              </motion.span>
              <span className="block text-found-plum">Is Waiting.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mb-10 text-body text-found-plum/70 max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
              <FoundButton href="/auth/register" variant="primary" size="lg">
                Begin Your Forever
              </FoundButton>
              <FoundButton href="/how-it-works" variant="secondary" size="lg">
                Explore FOUND
              </FoundButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-8 text-sm text-found-plum/50"
            >
              Built for meaningful connections and marriage
            </motion.p>
          </div>

          {/* Right: Layered visual composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Glow backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-found-rose/20 to-found-pink/10 blur-3xl" />

              {/* Main composition - intertwined ribbons forming heart */}
              <div className="relative aspect-square w-full">
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="ribbon1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7B244C" />
                      <stop offset="50%" stopColor="#C64B7A" />
                      <stop offset="100%" stopColor="#F47B9A" />
                    </linearGradient>
                    <linearGradient id="ribbon2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A46A" />
                      <stop offset="50%" stopColor="#C64B7A" />
                      <stop offset="100%" stopColor="#7B244C" />
                    </linearGradient>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Two intertwined ribbon paths forming heart shape */}
                  <motion.path
                    d="M200 320 C120 260 60 200 60 140 C60 80 110 50 160 70 C180 78 195 100 200 120 C205 100 220 78 240 70 C290 50 340 80 340 140 C340 200 280 260 200 320Z"
                    stroke="url(#ribbon1)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#softGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.path
                    d="M200 340 C140 290 100 240 100 190 C100 140 140 120 175 135 C190 142 200 160 200 175 C200 160 210 142 225 135 C260 120 300 140 300 190 C300 240 260 290 200 340Z"
                    stroke="url(#ribbon2)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 2, delay: 1 }}
                  />

                  {/* Center tiny heart */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.2, type: 'spring' }}
                  >
                    <path
                      d="M200 185 C192 178 186 170 186 162 C186 154 192 150 198 152 C200 153 200 156 200 158 C200 156 200 153 202 152 C208 150 214 154 214 162 C214 170 208 178 200 185Z"
                      fill="white"
                      opacity="0.9"
                    />
                  </motion.g>
                </svg>

                {/* Floating compatibility cards */}
                <motion.div
                  className="absolute -left-4 top-16 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-card"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-found-blush flex items-center justify-center">
                      <span className="text-lg">💕</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-found-plum">Shared Values</p>
                      <p className="text-[10px] text-found-rose font-semibold">92% match</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-6 bottom-24 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-card"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-found-lavender flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-found-burgundy" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-found-plum">AI Insight</p>
                      <p className="text-[10px] text-found-rose font-semibold">High compatibility</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-found-plum/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </motion.div>
    </section>
  );
}
