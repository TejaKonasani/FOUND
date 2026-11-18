'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
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
    <main className="min-h-screen bg-gradient-to-b from-found-blush to-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <Link href="/">
              <Logo className="mx-auto h-12 w-auto" />
            </Link>
          </div>

          <div className="card-premium">
            <h1 className="mb-2 text-center text-2xl font-display font-bold text-found-burgundy">
              Welcome Back
            </h1>
            <p className="mb-8 text-center text-sm text-found-plum/60">
              Sign in to continue your journey
            </p>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum placeholder:text-found-plum/40 focus:border-found-rose focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-12 text-found-plum placeholder:text-found-plum/40 focus:border-found-rose focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-found-plum/40 hover:text-found-plum"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-found-plum/70">
                  <input type="checkbox" className="h-4 w-4 rounded border-found-rose/30" />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-medium text-found-rose hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-found-plum/60">
              Don&apos;t have a profile?{' '}
              <Link href="/auth/register" className="font-medium text-found-rose hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <Link href="/" className="mt-6 block text-center text-sm text-found-plum/50 hover:text-found-plum">
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
