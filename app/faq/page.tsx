'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const faqs = [
  { category: 'General', q: 'What is FOUND?', a: 'FOUND is an AI-powered Indian matrimonial platform for adults seeking meaningful relationships leading to marriage.' },
  { category: 'General', q: 'Who can register?', a: 'Any consenting adult (18+) looking for a serious relationship and marriage across India.' },
  { category: 'General', q: 'Is FOUND free?', a: 'Creating a profile, onboarding, browsing, and expressing interest are free. Some advanced features may require a subscription.' },
  { category: 'Matching', q: 'How does matching work?', a: 'Our engine uses transparent weighted scoring across marriage goals, values, lifestyle, communication, family, culture, and interests.' },
  { category: 'Matching', q: 'Is the AI score a guarantee?', a: 'No. It provides explainable suggestions to help you discover compatible people — it does not predict marriage success.' },
  { category: 'Privacy', q: 'How is my data protected?', a: 'You control profile visibility, photos, and personal info. Messaging requires mutual interest. We never expose phone/email without consent.' },
  { category: 'Privacy', q: 'Can my family be involved?', a: 'Optionally. You can invite family to view selected details with your consent. They never access messages or hidden photos.' },
  { category: 'Account', q: 'How do I delete my account?', a: 'From settings, you can delete your account anytime. We remove data per our privacy policy and retention obligations.' },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(
    (f) =>
      (category === 'All' || f.category === category) &&
      (search === '' || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Frequently Asked Questions</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">Find answers to common questions about FOUND.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-found-plum/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-found-rose/20 bg-found-ivory py-3 pl-12 pr-4 text-found-plum placeholder:text-found-plum/40 focus:border-found-rose focus:outline-none"
            />
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  category === c ? 'bg-gradient-rose text-white' : 'bg-found-blush text-found-rose hover:bg-found-rose/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-found-ivory/50"
                >
                  <span className="font-display font-semibold text-found-burgundy">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-found-rose transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-body text-found-plum/70">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-found-plum/50">No questions found. Try a different search or category.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
