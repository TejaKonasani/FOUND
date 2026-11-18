'use client';

import { motion } from 'framer-motion';

const points = [
  {
    title: 'Understanding',
    description:
      'Real compatibility starts with understanding — how you communicate, resolve conflict, and support each other.',
  },
  {
    title: 'Shared Values',
    description:
      'From family importance to life goals, aligned values create the foundation for a lasting partnership.',
  },
  {
    title: 'Family Expectations',
    description:
      'In Indian culture, marriage often involves families. FOUND helps you navigate these expectations together.',
  },
  {
    title: 'Cultural Traditions',
    description:
      'Celebrate your heritage. Whether it&apos;s festivals, rituals, or daily customs, find someone who respects your traditions.',
  },
  {
    title: 'Emotional Compatibility',
    description:
      'The ability to be vulnerable, to listen, and to grow together — the heart of any lasting relationship.',
  },
  {
    title: 'Long-term Goals',
    description:
      'Where do you see yourself in 5, 10, 20 years? FOUND helps align your visions for the future.',
  },
];

export function BeyondSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="heading-section">
          <h2>Beyond Just a Match</h2>
          <p>
            A successful marriage is built on much more than surface-level
            attraction. Here&apos;s what we help you explore.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-found-ivory to-found-blush p-8 transition-all duration-300 hover:shadow-card"
            >
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-rose/10 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-rose">
                  <span className="text-lg font-display font-bold text-white">
                    {point.title[0]}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-display font-semibold text-found-burgundy">
                  {point.title}
                </h3>
                <p className="text-body text-found-plum/60 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
