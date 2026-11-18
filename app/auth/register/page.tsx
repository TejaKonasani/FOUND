'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Calendar, ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/lib/utils';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordCheck = validatePassword(password);
  const isAdult = dob ? new Date(dob).getFullYear() <= new Date().getFullYear() - 18 : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isAdult) {
      setError('You must be at least 18 years old to register.');
      return;
    }
    if (!passwordCheck.valid) {
      setError('Password does not meet requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);
    // TODO: Milestone 2 — call backend registration API
    setTimeout(() => {
      setLoading(false);
      setError('Registration will be available after backend setup (Milestone 2).');
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
              Create Your Profile
            </h1>
            <p className="mb-8 text-center text-sm text-found-plum/60">
              Begin your journey to finding your forever
            </p>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum placeholder:text-found-plum/40 focus:border-found-rose focus:outline-none"
                    required
                  />
                </div>
              </div>

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

              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum focus:border-found-rose focus:outline-none"
                    required
                  />
                </div>
                {!isAdult && dob && (
                  <p className="mt-1 text-xs text-red-600">You must be at least 18 years old.</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
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
                {password && (
                  <ul className="mt-2 space-y-1">
                    {passwordCheck.errors.map((err) => (
                      <li key={err} className="flex items-center gap-1.5 text-xs text-found-plum/50">
                        <Check className="h-3 w-3 text-green-500" />
                        {err}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum placeholder:text-found-plum/40 focus:border-found-rose focus:outline-none"
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-found-plum/70">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-found-rose/30"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-found-rose hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-found-rose hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Creating profile...' : 'Create Profile'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-found-plum/60">
              Already have a profile?{' '}
              <Link href="/auth/login" className="font-medium text-found-rose hover:underline">
                Sign in
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
