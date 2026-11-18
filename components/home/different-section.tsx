'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Shield } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Understanding Beyond Profiles',
    description:
      'We go deeper than photos and basic details. Discover shared values, communication styles, and what truly matters in a partnership.',
    color: 'from-found-rose to-found-pink',
    bgColor: 'bg-found-blush',
  },
  {
    icon: Users,
    title: 'Traditions That Matter to You',
    description:
      'Honor your cultural roots while finding someone who respects your traditions, festivals, and family values.',
    color: 'from-found-burgundy to-found-rose',
    bgColor: 'bg-found-ivory',
  },
  {
    icon: Sparkles,
    title: 'AI-Assisted Compatibility',
    description:
      'Our transparent matching engine considers marriage goals, lifestyle, and values — explained clearly, never a black box.',
    color: 'from-found-lavender to-found-rose',
    bgColor: 'bg-found-lavender/30',
  },
  {
    icon: Shield,
    title: 'Privacy, Trust & Mutual Respect',
    description:
      'Your data is protected. Messaging requires mutual interest. You control who sees what, when.',
    color: 'from-found-gold to-found-rose',
    bgColor: 'bg-found-champagne/30',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function DifferentSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="heading-section">
          <h2>What Makes FOUND Different</h2>
          <p>
            We&apos;re not another swiping app. FOUND is built for adults who
            want a meaningful, lifelong partnership — rooted in understanding,
            not just attraction.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <div className="card-premium h-full flex flex-col">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-glow`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-card-heading font-display font-semibold text-found-burgundy">
                  {feature.title}
                </h3>
                <p className="text-body text-found-plum/60 flex-1 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
