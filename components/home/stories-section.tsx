'use client';

import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

const stories = [
  {
    names: 'Illustrative Example',
    location: 'Mumbai & Pune',
    quote:
      'We matched on shared values around family and career. The compatibility explanation helped us start conversations that felt natural from day one.',
    tags: ['Shared Values', 'Family First', 'Career Ambition'],
  },
  {
    names: 'Illustrative Example',
    location: 'Delhi & Chandigarh',
    quote:
      'FOUND helped me be clear about what I wanted. The AI explanation showed us both valued traditions but were flexible on others — exactly what I was looking for.',
    tags: ['Traditions', 'Open-Minded', 'Life Goals'],
  },
  {
    names: 'Illustrative Example',
    location: 'Bangalore & Chennai',
    quote:
      'I appreciated that FOUND respects privacy. I could take my time, and when I was ready, the mutual-interest model meant every conversation was welcomed.',
    tags: ['Privacy', 'Patience', 'Mutual Respect'],
  },
];

export function StoriesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="heading-section">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-found-blush px-4 py-2 text-sm font-medium text-found-rose">
            <Heart className="h-4 w-4 fill-current" />
            Success Stories
          </div>
          <h2>Stories of Understanding</h2>
          <p>
            Real connections start with genuine understanding. These illustrative
            stories show how FOUND members describe their journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-premium relative flex flex-col"
            >
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
