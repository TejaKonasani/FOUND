'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-found-blush to-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/"><Logo className="mx-auto h-12 w-auto" /></Link>
          </div>
          <div className="card-premium text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-found-blush">
              <Mail className="h-8 w-8 text-found-rose" />
            </div>
            <h1 className="mb-2 text-2xl font-display font-bold text-found-burgundy">Verify Your Email</h1>
            <p className="mb-6 text-found-plum/60">
              We have sent a verification link to your email. Please check your inbox and click the link to verify your account.
            </p>
            <p className="mb-6 text-sm text-found-plum/50">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button className="text-found-rose hover:underline">resend</button>.
            </p>
            <Link href="/auth/login" className="btn-secondary w-full">
              Back to Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
