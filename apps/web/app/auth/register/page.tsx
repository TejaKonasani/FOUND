'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Calendar, ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/logo';
import { FoundPetalRain } from '@/components/ui/found-petal-rain';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserDocument, createProfileDocument, isAdult, calculateAge } from '@/lib/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
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
  const age = dob ? calculateAge(dob) : 0;
  const adult = dob ? isAdult(dob) : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!adult) {
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
    try {
      // 1. Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Update display name
      await updateProfile(user, { displayName: name });

      // 3. Send email verification
      await sendEmailVerification(user);

      // 4. Create Firestore user record (UID = doc ID)
      await createUserDocument(user.uid, {
        displayName: name,
        email,
        dateOfBirth: dob,
        emailVerified: false,
        onboardingStatus: 'incomplete',
      });

      // 5. Create empty profile document
      await createProfileDocument(user.uid, {
        publicDisplayName: name,
        age: calculateAge(dob),
        visibility: 'private',
      });

      // 6. Redirect to verification page
      router.replace('/auth/verify-email');
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      let message = 'Registration failed. Please try again.';
      if (firebaseError.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        message = 'This email address is not valid.';
      } else if (
        firebaseError.code === 'auth/weak-password' ||
        firebaseError.code === 'auth/password-does-not-meet-requirements'
      ) {
        message = 'Password is too weak. Use at least 8 characters with uppercase, lowercase, and a number.';
      } else if (firebaseError.code === 'auth/operation-not-allowed') {
        message = 'Email/password accounts are not enabled. Please contact support.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel — Cinematic brand experience */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block">
          <div className="auth-panel-cinematic absolute inset-0" />
          <FoundPetalRain variant="multi" count={20} className="opacity-70" />

          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-found-rose/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-found-gold/15 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            <Link href="/" aria-label="FOUND Home">
              <Logo variant="white" className="h-11 w-auto" />
            </Link>

            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <h1 className="cinematic-quote mb-6 text-3xl leading-snug text-white/95 xl:text-4xl">
                  Your forever story
                  <span className="block text-found-pink">
                    begins with a single step.
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-white/60">
                  Create your profile and let our AI-powered matching help you
                  find someone who truly understands you.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-found-gold text-lg">1</span>
                </div>
                <span>Create your authentic profile</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-found-gold text-lg">2</span>
                </div>
                <span>Get AI-matched with compatible people</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-found-gold text-lg">3</span>
                </div>
                <span>Build a connection that lasts forever</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel — Glass registration card */}
        <div className="relative flex w-full flex-1 items-start justify-center overflow-y-auto bg-gradient-to-b from-found-blush via-white to-found-ivory px-4 py-12 lg:items-center lg:px-16">
          <FoundPetalRain variant="rose" count={8} className="opacity-40" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(244,123,154,0.08),transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md py-8"
          >
            {/* Mobile logo */}
            <div className="mb-8 text-center lg:hidden">
              <Link href="/">
                <Logo className="mx-auto h-12 w-auto" />
              </Link>
            </div>

            <div className="glass-auth-card rounded-[32px] p-8 sm:p-10">
              <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold text-found-burgundy">
                  Create Your Profile
                </h1>
                <p className="text-sm text-found-plum/60">
                  Begin your journey to finding your forever
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
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="input-premium-icon h-5 w-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="input-premium"
                      required
                    />
                  </div>
                </div>

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
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="input-premium-icon h-5 w-5" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      className="input-premium"
                      required
                    />
                  </div>
                  {dob && !adult && (
                    <p className="mt-1 text-xs text-red-600">You must be at least 18 years old.</p>
                  )}
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
                      placeholder="Create a strong password"
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
                  {password && (
                    <ul className="mt-3 space-y-1.5">
                      {passwordCheck.errors.map((err) => (
                        <li key={err} className="flex items-center gap-2 text-xs text-found-plum/50">
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          {err}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-found-plum">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="input-premium-icon h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="input-premium"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-found-plum/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-found-rose/30 accent-found-rose"
                  />
                  <span>
                    I agree to the{' '}
                    <Link href="/terms" className="font-medium text-found-rose hover:text-found-burgundy transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="font-medium text-found-rose hover:text-found-burgundy transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-4 text-base"
                >
                  {loading ? 'Creating your profile...' : 'Create Profile'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-found-plum/60">
                Already have a profile?{' '}
                <Link
                  href="/auth/login"
                  className="font-semibold text-found-rose hover:text-found-burgundy transition-colors"
                >
                  Sign in
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
