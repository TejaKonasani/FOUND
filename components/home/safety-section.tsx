'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, MessageSquare, Ban, Lock, Users } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

const safetyFeatures = [
  { icon: Eye, title: 'Profile Visibility Controls', desc: 'Choose who can see your profile and photos.' },
  { icon: MessageSquare, title: 'Mutual-Interest Messaging', desc: 'Only connect with people who are interested in you too.' },
  { icon: Ban, title: 'Reporting & Blocking', desc: 'Report suspicious accounts and block anyone instantly.' },
  { icon: Lock, title: 'Secure Personal Info', desc: 'Your phone number and email stay private until you share them.' },
  { icon: Users, title: 'Consent-Based Family Involvement', desc: 'Invite family to view your profile — only with your permission.' },
  { icon: Shield, title: 'Verification Options', desc: 'Optional verification badges to build trust.' },
];

export function SafetySection() {
  return (
    <section className="relative section-space bg-lavender-pearl overflow-hidden">
      <OrganicShapes variant="soft" />

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Privacy & Safety Built In"
          subtitle="Your security and privacy are non-negotiable. FOUND is designed with safety at its core."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-bento flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-1.5 font-display font-semibold text-found-burgundy">
                  {feature.title}
                </h3>
                <p className="text-sm text-found-plum/60 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-3xl bg-burgundy-plum p-8 sm:p-12 text-center text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-32 h-32 rounded-full bg-found-rose" />
            <div className="absolute bottom-4 right-8 w-24 h-24 rounded-full bg-found-gold" />
          </div>
          <div className="relative z-10">
            <h3 className="mb-3 text-2xl sm:text-3xl font-display font-semibold">
              Safety First, Always
            </h3>
            <p className="mx-auto max-w-2xl text-white/80 leading-relaxed">
              Never send money to someone you've only met online. Meet in
              public places for first meetings. Report any suspicious behavior
              immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
