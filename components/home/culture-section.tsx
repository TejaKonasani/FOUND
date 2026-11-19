'use client';

import { motion } from 'framer-motion';
import { EditorialHeading } from '@/components/ui/editorial-heading';

const regions = [
  'North India', 'South India', 'East India', 'West India', 'Northeast', 'Central India',
];
const traditions = [
  'Wedding Rituals', 'Festivals', 'Family Customs', 'Languages', 'Religious Practices', 'Cuisine',
];

export function CultureSection() {
  return (
    <section className="relative section-space overflow-hidden">
      {/* Warm champagne-rose gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(135deg, #F7E8D6 0%, #FFF0F4 40%, #FCD5CE 70%, #F7E8D6 100%)',
        }}
      />
      {/* Decorative floral overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Every Culture. Every Tradition. Every Story."
          subtitle="FOUND celebrates India's incredible diversity. Whether you share traditions or are curious to learn, you'll find your people here."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image collage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
              <img
                src="/assets/culture-collage.png"
                alt="Indian wedding cultural collage"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent" />
            </div>
            {/* Floating decorative arches */}
            <svg
              className="absolute -top-6 -right-6 h-32 w-32 text-amber-400/40 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path d="M10 100 Q50 -20 90 100" stroke="currentColor" strokeWidth="3" fill="none" />
              <path d="M20 100 Q50 0 80 100" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
            </svg>
            <svg
              className="absolute -bottom-4 -left-4 h-28 w-28 text-rose-400/40 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
              <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.4" />
            </svg>
          </motion.div>

          {/* Right: Regions & Traditions */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-card border border-rose-100/60"
            >
              <h3 className="mb-5 text-2xl font-display font-bold text-found-burgundy flex items-center gap-3">
                <span className="text-3xl">🌏</span>
                Regions We Welcome
              </h3>
              <div className="flex flex-wrap gap-3">
                {regions.map((r, i) => (
                  <motion.span
                    key={r}
                    whileHover={{ scale: 1.06, y: -2 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="rounded-full bg-gradient-to-r from-rose-100 to-amber-100 px-5 py-2.5 text-sm font-semibold text-found-rose shadow-sm border border-rose-200/50 hover:from-rose-400 hover:to-pink-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    {r}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-card border border-rose-100/60"
            >
              <h3 className="mb-5 text-2xl font-display font-bold text-found-burgundy flex items-center gap-3">
                <span className="text-3xl">🪔</span>
                Traditions You Can Share
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {traditions.map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 p-3.5 text-sm font-medium text-found-plum/80 shadow-sm border border-amber-100/60"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-sm" />
                    {t}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-found-plum/60 italic max-w-3xl mx-auto"
        >
          FOUND never automatically ranks or filters people by caste, religion, or community.
          Those are your choices to make — not an algorithm's.
        </motion.p>
      </div>
    </section>
  );
}
