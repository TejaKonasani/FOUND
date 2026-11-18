'use client';

import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';
import { EditorialHeading } from '@/components/ui/editorial-heading';

const stories = [
  {
    names: 'A & R',
    location: 'Mumbai & Pune',
    quote: 'We matched on shared values around family and career. The compatibility explanation helped us start conversations that felt natural from day one.',
    tags: ['Shared Values', 'Family First', 'Career Ambition'],
  },
  {
    names: 'P & K',
    location: 'Delhi & Chandigarh',
    quote: 'FOUND helped me be clear about what I wanted. The AI explanation showed us both valued traditions but were flexible on others — exactly what I was looking for.',
    tags: ['Traditions', 'Open-Minded', 'Life Goals'],
  },
  {
    names: 'S & M',
    location: 'Bangalore & Chennai',
    quote: 'I appreciated that FOUND respects privacy. I could take my time, and when I was ready, the mutual-interest model meant every conversation was welcomed.',
    tags: ['Privacy', 'Patience', 'Mutual Respect'],
  },
];

export function StoriesSection() {
  return (
    <section className="relative section-space bg-rose-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-10 text-[12rem] font-display font-bold text-found-rose/[0.03] max-lg:hidden">"</span>
        <span className="absolute bottom-10 right-10 text-[12rem] font-display font-bold text-found-rose/[0.03] rotate-180 max-lg:hidden">"</span>
      </div>

      <div className="container-page relative z-10">
        <EditorialHeading
          title="Stories of Understanding"
          subtitle="Real connections start with genuine understanding. These illustrative stories show how FOUND members describe their journeys."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-arch flex flex-col"
            >
              <div className="card-arch-body flex-1 flex flex-col">
                <Quote className="mb-4 h-8 w-8 text-found-rose/30" />
                <p className="mb-6 flex-1 text-body text-found-plum/70 italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-found-blush px-3 py-1 text-xs font-medium text-found-rose"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-found-rose/10 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-rose text-sm font-bold text-white">
                    {story.names[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-found-burgundy">
                      {story.names}
                    </p>
                    <p className="text-xs text-found-plum/50">{story.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-found-plum/40 italic">
          These are illustrative examples. We will share genuine consented
          testimonials from real couples as they become available.
        </p>
      </div>
    </section>
  );
}
