'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const cultures = [
  'North India',
  'South India',
  'East India',
  'West India',
  'Northeast India',
  'Central India',
];

const traditions = [
  'Festivals & Celebrations',
  'Wedding Rituals',
  'Family Customs',
  'Languages',
  'Religious Practices',
  'Cultural Expectations',
];

export function CultureSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="heading-section">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-found-champagne/50 px-4 py-2 text-sm font-medium text-found-burgundy">
            <Globe className="h-4 w-4" />
            All of India, One Platform
          </div>
          <h2>Every Culture, Welcome Here</h2>
          <p>
            FOUND celebrates India&apos;s incredible diversity. Whether you&apos;re
            looking for someone who shares your traditions or is curious to learn
            about another, you&apos;ll find your people here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium"
          >
            <h3 className="mb-6 text-xl font-display font-semibold text-found-burgundy">
              Regions We Welcome
            </h3>
            <div className="flex flex-wrap gap-3">
              {cultures.map((culture) => (
                <span
                  key={culture}
                  className="rounded-full bg-found-blush px-5 py-2.5 text-sm font-medium text-found-rose transition-all hover:bg-gradient-rose hover:text-white"
                >
                  {culture}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-found-plum/60">
              Set optional preferences for region, language, and community — or
              keep your search open to all of India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card-premium"
          >
            <h3 className="mb-6 text-xl font-display font-semibold text-found-burgundy">
              Traditions You Can Share
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {traditions.map((tradition) => (
                <div
                  key={tradition}
                  className="flex items-center gap-2 rounded-xl bg-found-ivory p-3 text-sm text-found-plum/70"
                >
                  <span className="h-2 w-2 rounded-full bg-found-rose" />
                  {tradition}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-found-plum/60">
              For each tradition, indicate whether it&apos;s essential, important,
              flexible, or not important to you.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-found-plum/50 italic"
        >
          FOUND never automatically ranks or filters people by caste, religion, or
          community. Those are your choices to make — not an algorithm&apos;s.
        </motion.p>
      </div>
    </section>
  );
}
