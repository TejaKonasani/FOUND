'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { validateEmail } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    // TODO: Milestone 2 — call backend forgot-password API
    setSent(true);
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
            {sent ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-found-blush">
                  <Mail className="h-8 w-8 text-found-rose" />
                </div>
                <h1 className="mb-2 text-2xl font-display font-bold text-found-burgundy">Check Your Email</h1>
                <p className="mb-6 text-found-plum/60">
                  If an account exists for {email}, you will receive a password reset link shortly.
                </p>
                <Link href="/auth/login" className="btn-secondary w-full">
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <>
                <h1 className="mb-2 text-center text-2xl font-display font-bold text-found-burgundy">
                  Reset Password
                </h1>
                <p className="mb-8 text-center text-sm text-found-plum/60">
                  Enter your email and we will send you a reset link
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Email</label>
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
                  <button type="submit" className="btn-primary w-full">
                    Send Reset Link
                  </button>
                </form>
                <Link href="/auth/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-found-rose hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Back to Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
