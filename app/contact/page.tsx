'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Shield, Send } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const categories = [
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
  { value: 'technical', label: 'Technical Issue', icon: Mail },
  { value: 'account', label: 'Account Issue', icon: Shield },
  { value: 'privacy', label: 'Privacy Request', icon: Shield },
  { value: 'report', label: 'Report an Account', icon: Shield },
];

export default function ContactPage() {
  const [category, setCategory] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP: persist to localStorage as real backend is Milestone 2
    const submissions = JSON.parse(localStorage.getItem('found_contact_submissions') || '[]');
    submissions.push({ category, name, email, message, createdAt: new Date().toISOString() });
    localStorage.setItem('found_contact_submissions', JSON.stringify(submissions));
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Contact & Help</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            Have a question or need help? We are here for you.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-rose">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-2xl font-display font-semibold text-found-burgundy">Message Sent</h2>
              <p className="text-found-plum/70">Thank you for reaching out. We will get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 text-found-plum focus:border-found-rose focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 text-found-plum focus:border-found-rose focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 text-found-plum focus:border-found-rose focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-found-plum">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 text-found-plum focus:border-found-rose focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
