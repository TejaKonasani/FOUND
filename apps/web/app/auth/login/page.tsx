'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '@/components/logo';
import { FoundPetalRain } from '@/components/ui/found-petal-rain';
import Link from 'next/link';
import { validateEmail } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    // TODO: Milestone 2 — call backend login API
    setTimeout(() => {
      setLoading(false);
      setError('Authentication will be available after backend setup (Milestone 2).');
    }, 800);
  };

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel — Cinematic brand experience */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block">
          <div className="auth-panel-cinematic absolute inset-0" />
          <FoundPetalRain variant="multi" count={20} className="opacity-70" />

          {/* Decorative heart glow */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-found-rose/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-found-gold/15 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            {/* Top: Logo */}
            <Link href="/" aria-label="FOUND Home">
              <Logo variant="white" className="h-11 w-auto" />
            </Link>

            {/* Center: Cinematic quote */}
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <Sparkles className="mb-6 h-8 w-8 text-found-gold/80" />
                <h1 className="cinematic-quote mb-6 text-3xl leading-snug text-white/95 xl:text-4xl">
                  &ldquo;In a world of endless choices,
                  <span className="block text-found-pink">
                    understanding is the rarest find.
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-white/60">
                  Where Understanding Becomes Forever — discover your person,
                  built on shared values and genuine connection.
                </p>
              </motion.div>
            </div>

            {/* Bottom: Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-found-gold">✦</span>
                Verified Profiles
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-found-gold">✦</span>
                AI Matchmaking
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-found-gold">✦</span>
                Safe & Private
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel — Glass login card */}
        <div className="relative flex w-full flex-1 items-center justify-center bg-gradient-to-b from-found-blush via-white to-found-ivory px-4 py-12 lg:px-16">
          {/* Subtle background decoration */}
          <FoundPetalRain variant="rose" count={8} className="opacity-40" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(244,123,154,0.08),transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo (only on small screens) */}
            <div className="mb-8 text-center lg:hidden">
              <Link href="/">
                <Logo className="mx-auto h-12 w-auto" />
              </Link>
            </div>

            <div className="glass-auth-card rounded-[32px] p-8 sm:p-10">
              <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold text-found-burgundy">
                  Welcome Back
                </h1>
                <p className="text-sm text-found-plum/60">
                  Sign in to continue your journey
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-2xl bg-red-50/80 p-4 text-sm text-red-700 backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-found-plum">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="input-premium-icon h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-premium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-found-plum">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="input-premium-icon h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-premium pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-found-plum/40 hover:text-found-rose transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-found-plum/70 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-found-rose/30 accent-found-rose"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-found-rose hover:text-found-burgundy transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-4 text-base"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-found-plum/60">
                Don&apos;t have a profile?{' '}
                <Link
                  href="/auth/register"
                  className="font-semibold text-found-rose hover:text-found-burgundy transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-found-plum/50 hover:text-found-plum transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
