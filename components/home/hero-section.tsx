'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-found-blush via-found-ivory to-white" />

      {/* Decorative floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="heart-deco top-20 left-[10%] text-found-rose/20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-16 w-16 fill-current" />
        </motion.div>
        <motion.div
          className="heart-deco top-40 right-[15%] text-found-pink/20"
          animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Heart className="h-12 w-12 fill-current" />
        </motion.div>
        <motion.div
          className="heart-deco bottom-40 left-[20%] text-found-burgundy/10"
          animate={{ y: [0, -25, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Heart className="h-20 w-20 fill-current" />
        </motion.div>
        <motion.div
          className="heart-deco top-1/3 right-[8%] text-found-rose/15"
          animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Heart className="h-10 w-10 fill-current" />
        </motion.div>
      </div>

      <div className="container-page relative z-10 flex min-h-[calc(100vh-6rem)] items-center">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-found-rose shadow-soft backdrop-blur-sm"
            >
              <Heart className="h-4 w-4 fill-found-rose" />
              Built for meaningful connections and marriage
            </motion.div>

            <h1 className="mb-6 font-display text-hero font-bold text-found-plum">
              Somewhere,{' '}
              <span className="gradient-text">Your Forever</span>{' '}
              Is Waiting.
            </h1>

            <p className="mb-8 text-body text-found-plum/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover meaningful connections built on shared values, genuine
              understanding, and dreams of a beautiful life together.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/auth/register" className="btn-primary w-full sm:w-auto">
                Begin Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/how-it-works" className="btn-secondary w-full sm:w-auto">
                How FOUND Works
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Decorative circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-rose/10 blur-3xl" />

              {/* Main visual card */}
              <div className="relative rounded-3xl bg-white p-2 shadow-card">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-found-blush to-found-ivory flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-rose shadow-glow"
                    >
                      <Heart className="h-12 w-12 text-white fill-white" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold text-found-burgundy mb-2">
                      Find Your Person
                    </h3>
                    <p className="text-found-plum/60">
                      Build your forever together
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                className="absolute -left-8 top-1/4 rounded-2xl bg-white p-4 shadow-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-found-blush flex items-center justify-center">
                    <Heart className="h-5 w-5 text-found-rose" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-found-plum">Shared Values</p>
                    <p className="text-[10px] text-found-plum/50">92% match</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-6 bottom-1/4 rounded-2xl bg-white p-4 shadow-card"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-found-lavender flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-found-plum">AI Match</p>
                    <p className="text-[10px] text-found-plum/50">High compatibility</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80V40C240 10 480 0 720 20C960 40 1200 30 1440 10V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
