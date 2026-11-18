'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Shield } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

const features = [
  {
    icon: Heart,
    title: 'Understanding Beyond Profiles',
    description: 'We go deeper than photos and basic details. Discover shared values, communication styles, and what truly matters in a partnership.',
    color: 'from-found-rose to-found-pink',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: Users,
    title: 'Traditions That Matter',
    description: 'Honor your cultural roots while finding someone who respects your traditions.',
    color: 'from-found-burgundy to-found-rose',
    span: 'lg:col-span-1',
  },
  {
    icon: Sparkles,
    title: 'AI-Assisted Compatibility',
    description: 'Transparent matching explained clearly, never a black box.',
    color: 'from-found-lavender to-found-rose',
    span: 'lg:col-span-1',
  },
  {
    icon: Shield,
    title: 'Privacy & Mutual Respect',
    description: 'Your data is protected. Messaging requires mutual interest. You control who sees what.',
    color: 'from-found-gold to-found-rose',
    span: 'lg:col-span-2',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function DifferentSection() {
  return (
    <section className="relative section-space bg-lavender-champagne overflow-hidden">
      <OrganicShapes variant="warm" />
      <div className="grain" />

      <div className="container-page relative z-10">
        <EditorialHeading
          title="What Makes FOUND Different"
          subtitle="We're not another swiping app. FOUND is built for adults who want a meaningful, lifelong partnership — rooted in understanding, not just attraction."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} className={feature.span}>
              <div className="card-layered h-full flex flex-col min-h-[200px]">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-glow`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-card font-display font-semibold text-found-burgundy">
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
