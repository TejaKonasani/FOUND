'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { validatePassword } from '@/lib/utils';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const check = validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    // TODO: Milestone 2 — call backend reset-password API
    setDone(true);
  };

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-found-blush to-white">
        <div className="flex min-h-screen items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-premium w-full max-w-md text-center">
            <h1 className="mb-2 text-2xl font-display font-bold text-found-burgundy">Password Reset</h1>
            <p className="mb-6 text-found-plum/60">Your password has been reset successfully.</p>
            <Link href="/auth/login" className="btn-primary w-full">Sign In</Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-found-blush to-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/"><Logo className="mx-auto h-12 w-auto" /></Link>
          </div>
          <div className="card-premium">
            <h1 className="mb-2 text-center text-2xl font-display font-bold text-found-burgundy">Set New Password</h1>
            <p className="mb-8 text-center text-sm text-found-plum/60">Create a strong password for your account</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-12 text-found-plum focus:border-found-rose focus:outline-none" required />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-found-plum/40">
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && (
                  <ul className="mt-2 space-y-1">
                    {check.errors.map((err) => (
                      <li key={err} className="text-xs text-found-plum/50">• {err}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input type={show ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum focus:border-found-rose focus:outline-none" required />
                </div>
                {confirm && password !== confirm && <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>}
              </div>
              <button type="submit" disabled={password !== confirm || !check.valid} className="btn-primary w-full">Reset Password</button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
