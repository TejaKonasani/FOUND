import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart, Quote } from 'lucide-react';

const stories = [
  {
    names: 'A & R',
    location: 'Mumbai & Pune',
    quote: 'We matched on shared values around family and career. The compatibility explanation helped us start conversations that felt natural from day one.',
    tags: ['Shared Values', 'Family First'],
  },
  {
    names: 'P & K',
    location: 'Delhi & Chandigarh',
    quote: 'FOUND helped me be clear about what I wanted. The AI explanation showed us both valued traditions but were flexible on others.',
    tags: ['Traditions', 'Open-Minded'],
  },
  {
    names: 'S & M',
    location: 'Bangalore & Chennai',
    quote: 'I appreciated that FOUND respects privacy. When I was ready, the mutual-interest model meant every conversation was welcomed.',
    tags: ['Privacy', 'Mutual Respect'],
  },
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
            <Heart className="h-8 w-8 text-white fill-white" />
          </div>
          <h1 className="mb-6 text-section text-found-burgundy">Success Stories</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            Real connections start with genuine understanding. These illustrative stories show how FOUND members describe their journeys.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stories.map((s, i) => (
              <div key={i} className="card-premium relative flex flex-col">
                <Quote className="mb-4 h-8 w-8 text-found-rose/30" />
                <p className="mb-6 flex-1 text-body text-found-plum/70 italic leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full bg-found-blush px-3 py-1 text-xs font-medium text-found-rose">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-found-rose/10 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-rose text-sm font-bold text-white">{s.names[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-found-burgundy">{s.names}</p>
                    <p className="text-xs text-found-plum/50">{s.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-found-plum/40 italic">
            These are illustrative examples. We will share genuine consented testimonials from real couples as they become available.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
