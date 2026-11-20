'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FoundButton } from '@/components/ui/found-button';
import { PetalRain } from '@/components/ui/petal-rain';

/**
 * FOUND Hero Section
 * Uses the approved cinematic hero image (1672×941, 16:9).
 * The image already contains: couple, glowing heart, sunset, florals,
 * headline, supporting paragraph, and floating labels.
 * HTML does NOT duplicate those — only adds interactive buttons + trust indicators.
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero background image with responsive art direction */}
      <div className="absolute inset-0 -z-20">
        {/* Desktop/Laptop: full cinematic image, preserve aspect ratio */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: 'url("/assets/found-hero-background.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Mobile/Tablet: crop to focus on couple + sunset (art direction) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: 'url("/assets/found-hero-background.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Subtle gradient overlay for depth and text contrast */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-950/20 via-transparent to-rose-950/40" />
      </div>

      {/* Falling rose petals */}
      <PetalRain />

      <div className="container-page relative z-20 flex min-h-screen flex-col items-center justify-end pb-20 pt-32">
        {/* Buttons overlay — positioned below the embedded description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-3xl"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <FoundButton
              href="/auth/register"
              variant="primary"
              size="lg"
              className="!bg-white/95 !text-found-rose !shadow-2xl !border-2 !border-white/60 hover:!bg-white hover:!scale-105"
            >
              Begin Your Forever
            </FoundButton>
            <FoundButton
              href="/how-it-works"
              variant="secondary"
              size="lg"
              className="!bg-white/20 !text-white !border-2 !border-white/50 hover:!bg-white/30 backdrop-blur-sm"
            >
              Explore FOUND
            </FoundButton>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-white/90 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-200 fill-amber-200" />
              <span>AI Matching</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-200 fill-amber-200" />
              <span>Verified Profiles</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-200 fill-amber-200" />
              <span>Privacy First</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex"
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
