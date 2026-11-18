'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

const cultures = [
  'North India', 'South India', 'East India', 'West India', 'Northeast India', 'Central India',
];
const traditions = [
  'Festivals & Celebrations', 'Wedding Rituals', 'Family Customs',
  'Languages', 'Religious Practices', 'Cultural Expectations',
];

export function CultureSection() {
  return (
    <section className="relative section-space bg-champagne-rose overflow-hidden">
      <OrganicShapes variant="warm" />
      <div className="grain" />

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Every Culture. Every Tradition. Every Story."
          subtitle="FOUND celebrates India's incredible diversity. Whether you're looking for someone who shares your traditions or is curious to learn about another, you'll find your people here."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-arch"
          >
            <div className="card-arch-body">
              <h3 className="mb-6 text-2xl font-display font-semibold text-found-burgundy flex items-center gap-3">
                <Globe className="h-6 w-6 text-found-rose" />
                Regions We Welcome
              </h3>
              <div className="flex flex-wrap gap-3">
                {cultures.map((culture) => (
                  <motion.span
                    key={culture}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full bg-white/80 px-5 py-2.5 text-sm font-medium text-found-rose shadow-soft transition-all hover:bg-gradient-rose hover:text-white"
                  >
                    {culture}
                  </motion.span>
                ))}
              </div>
              <p className="mt-6 text-sm text-found-plum/60">
                Set optional preferences for region, language, and community — or
                keep your search open to all of India.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card-arch"
          >
            <div className="card-arch-body">
              <h3 className="mb-6 text-2xl font-display font-semibold text-found-burgundy">
                Traditions You Can Share
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {traditions.map((tradition) => (
                  <div
                    key={tradition}
                    className="flex items-center gap-2 rounded-xl bg-white/80 p-3 text-sm text-found-plum/70 shadow-soft"
                  >
                    <span className="h-2 w-2 rounded-full bg-found-rose" />
                    {tradition}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-found-plum/60">
                For each tradition, indicate whether it's essential, important,
                flexible, or not important to you.
              </p>
            </div>
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
          community. Those are your choices to make — not an algorithm's.
        </motion.p>
      </div>
    </section>
  );
}
