'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/features', label: 'Features' },
  { href: '/safety', label: 'Safety' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-page flex items-center justify-between">
          <Link href="/" className="z-50 flex-shrink-0" aria-label="FOUND Home">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                  isScrolled
                    ? 'text-found-plum/80 hover:text-found-rose hover:bg-found-blush'
                    : 'text-found-plum/90 hover:text-found-rose hover:bg-white/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/auth/login"
              className={cn(
                'px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
                isScrolled
                  ? 'text-found-plum hover:text-found-rose'
                  : 'text-found-plum/90 hover:text-found-rose'
              )}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="btn-primary !px-5 !py-2.5 !text-sm"
            >
              Create Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden z-50 p-2 rounded-full text-found-plum hover:bg-found-blush transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between mb-8">
                  <Logo className="h-9 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-found-plum hover:bg-found-blush transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-lg font-medium text-found-plum rounded-xl hover:bg-found-blush hover:text-found-rose transition-all"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="space-y-3 pt-6 border-t border-found-rose/10">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-found-plum rounded-full border-2 border-found-rose/20 hover:border-found-rose hover:bg-found-blush transition-all"
                  >
                    <User className="h-5 w-5" />
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full"
                  >
                    Create Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
