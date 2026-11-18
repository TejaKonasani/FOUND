'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is FOUND?',
    a: 'FOUND is an AI-powered Indian matrimonial platform designed for adults seeking meaningful, long-term relationships leading to marriage. We focus on shared values, cultural traditions, and genuine understanding — not swiping.',
  },
  {
    q: 'Who can register on FOUND?',
    a: 'Any consenting adult (18+) looking for a serious relationship and marriage. We welcome people from all communities, regions, and backgrounds across India.',
  },
  {
    q: 'How does matching work?',
    a: 'Our matching engine uses a transparent, weighted scoring system across marriage goals, values, lifestyle, communication, family expectations, cultural preferences, and interests. You see exactly why two people are recommended to each other.',
  },
  {
    q: 'Is the AI compatibility score a guarantee?',
    a: 'No. Our AI provides explainable suggestions based on the information you share. It helps you discover compatible people and start meaningful conversations — it does not predict or guarantee marriage success.',
  },
  {
    q: 'How does FOUND protect my privacy?',
    a: 'You control your profile visibility, photos, and personal information. Messaging requires mutual interest. We never expose your phone number or email without your consent.',
  },
  {
    q: 'Can my family be involved?',
    a: 'Yes, optionally. You can invite a family member to view your profile and share selected details — only with your explicit consent. Family members never access your private messages or hidden photos.',
  },
  {
    q: 'What features are free?',
    a: 'Creating a profile, completing onboarding, browsing compatible profiles, and expressing interest are free. Some advanced features may require a subscription.',
  },
  {
    q: 'How do I delete my account?',
    a: 'You can delete your account at any time from your settings. We will remove your data according to our privacy policy and applicable retention obligations.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-gradient-to-b from-found-blush/30 to-white">
      <div className="container-page max-w-3xl">
        <div className="heading-section">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about getting started with FOUND.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl bg-white shadow-soft"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-found-ivory/50"
                aria-expanded={openIndex === i}
              >
                <span className="font-display font-semibold text-found-burgundy">
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
                    <p className="px-6 pb-6 text-body text-found-plum/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
