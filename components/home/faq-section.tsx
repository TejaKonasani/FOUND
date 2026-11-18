'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import Link from 'next/link';

const faqs = [
  { q: 'What is FOUND?', a: 'FOUND is an AI-powered Indian matrimonial platform designed for adults seeking meaningful, long-term relationships leading to marriage. We focus on shared values, cultural traditions, and genuine understanding — not swiping.' },
  { q: 'Who can register on FOUND?', a: 'Any consenting adult (18+) looking for a serious relationship and marriage. We welcome people from all communities, regions, and backgrounds across India.' },
  { q: 'How does matching work?', a: 'Our matching engine uses a transparent, weighted scoring system across marriage goals, values, lifestyle, communication, family expectations, cultural preferences, and interests. You see exactly why two people are recommended to each other.' },
  { q: 'Is the AI compatibility score a guarantee?', a: 'No. Our AI provides explainable suggestions based on the information you share. It helps you discover compatible people and start meaningful conversations — it does not predict or guarantee marriage success.' },
  { q: 'How does FOUND protect my privacy?', a: 'You control your profile visibility, photos, and personal information. Messaging requires mutual interest. We never expose your phone number or email without your consent.' },
  { q: 'Can my family be involved?', a: 'Yes, optionally. You can invite a family member to view your profile and share selected details — only with your explicit consent. Family members never access your private messages or hidden photos.' },
  { q: 'What features are free?', a: 'Creating a profile, completing onboarding, browsing compatible profiles, and expressing interest are free. Some advanced features may require a subscription.' },
  { q: 'How do I delete my account?', a: 'You can delete your account at any time from your settings. We will remove your data according to our privacy policy and applicable retention obligations.' },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative section-space bg-peach overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-20 right-20 w-64 h-64 rounded-full bg-found-rose/5 blur-3xl" />
        <span className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-found-champagne/50 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: Editorial */}
          <div className="lg:col-span-2">
            <EditorialHeading
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about getting started with FOUND."
              align="left"
            />
            <div className="mt-8 rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-soft border border-white/40">
              <HelpCircle className="h-8 w-8 text-found-rose mb-3" />
              <h3 className="text-lg font-display font-semibold text-found-burgundy mb-2">
                Still have questions?
              </h3>
              <p className="text-sm text-found-plum/60 mb-4">
                Our support team is here to help you every step of the way.
              </p>
              <Link href="/contact" className="text-sm font-medium text-found-rose hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-soft border border-white/40"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-found-ivory/50"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-display font-semibold text-found-burgundy pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-found-rose transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-body text-found-plum/70 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
