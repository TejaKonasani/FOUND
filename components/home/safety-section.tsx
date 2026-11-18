'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, MessageSquare, Ban, Lock, Users } from 'lucide-react';

const safetyFeatures = [
  {
    icon: Eye,
    title: 'Profile Visibility Controls',
    description: 'Choose who can see your profile and photos.',
  },
  {
    icon: MessageSquare,
    title: 'Mutual-Interest Messaging',
    description: 'Only connect with people who are interested in you too.',
  },
  {
    icon: Ban,
    title: 'Reporting & Blocking',
    description: 'Report suspicious accounts and block anyone instantly.',
  },
  {
    icon: Lock,
    title: 'Secure Personal Info',
    description: 'Your phone number and email stay private until you share them.',
  },
  {
    icon: Users,
    title: 'Consent-Based Family Involvement',
    description: 'Invite family to view your profile — only with your permission.',
  },
  {
    icon: Shield,
    title: 'Verification Options',
    description: 'Optional verification badges to build trust.',
  },
];

export function SafetySection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-found-blush/30">
      <div className="container-page">
        <div className="heading-section">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-found-champagne/50 px-4 py-2 text-sm font-medium text-found-burgundy">
            <Shield className="h-4 w-4" />
            Your Safety Matters
          </div>
          <h2>Privacy & Safety Built In</h2>
          <p>
            Your security and privacy are non-negotiable. FOUND is designed with
            safety at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-soft transition-all hover:shadow-card"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-found-blush">
                <feature.icon className="h-6 w-6 text-found-rose" />
              </div>
              <div>
                <h3 className="mb-1.5 font-display font-semibold text-found-burgundy">
                  {feature.title}
                </h3>
                <p className="text-sm text-found-plum/60">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl bg-found-plum p-8 text-center text-white"
        >
          <h3 className="mb-3 text-2xl font-display font-semibold">
            Safety First, Always
          </h3>
          <p className="mx-auto max-w-2xl text-white/80">
            Never send money to someone you&apos;ve only met online. Meet in
            public places for first meetings. Report any suspicious behavior
            immediately.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
