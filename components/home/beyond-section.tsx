'use client';

import { motion } from 'framer-motion';
import { EditorialHeading } from '@/components/ui/editorial-heading';
import { OrganicShapes } from '@/components/ui/organic-shapes';

const dimensions = [
  { letter: 'U', title: 'Understanding', desc: 'Real compatibility starts with understanding — how you communicate, resolve conflict, and support each other.' },
  { letter: 'S', title: 'Shared Values', desc: 'From family importance to life goals, aligned values create the foundation for a lasting partnership.' },
  { letter: 'F', title: 'Family Expectations', desc: 'In Indian culture, marriage often involves families. FOUND helps you navigate these expectations together.' },
  { letter: 'C', title: 'Cultural Traditions', desc: 'Celebrate your heritage. Whether it is festivals, rituals, or daily customs, find someone who respects your traditions.' },
  { letter: 'E', title: 'Emotional Compatibility', desc: 'The ability to be vulnerable, to listen, and to grow together — the heart of any lasting relationship.' },
  { letter: 'L', title: 'Long-term Goals', desc: 'Where do you see yourself in 5, 10, 20 years? FOUND helps align your visions for the future.' },
];

const bgWords = ['UNDERSTANDING', 'VALUES', 'TOGETHER', 'FOREVER', 'TRUST'];

export function BeyondSection() {
  return (
    <section className="relative section-space bg-rose-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {bgWords.map((w, i) => (
          <span
            key={i}
            className="absolute font-display font-bold text-[clamp(4rem,12vw,10rem)] text-found-rose/[0.03] whitespace-nowrap max-lg:hidden"
            style={{
              left: `${(i * 22) % 90}%`,
              top: `${(i * 17) % 80}%`,
              transform: `rotate(${(i % 2 ? -1 : 1) * 8}deg)`,
            }}
          >
            {w}
          </span>
        ))}
      </div>
      <OrganicShapes variant="soft" />

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Beyond Just a Match"
          subtitle="A successful marriage is built on much more than surface-level attraction. Here is what we help you explore."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {dimensions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`flex gap-6 items-start ${i % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}
            >
              <div className="flex-shrink-0">
                <div className="card-organic w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gradient-rose shadow-glow">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white">{d.letter}</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-display font-semibold text-found-burgundy mb-3">
                  {d.title}
                </h3>
                <p className="text-body text-found-plum/70 leading-relaxed">
                  {d.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
