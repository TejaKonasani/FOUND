import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart, Shield, Users, X } from 'lucide-react';

const dos = [
  'Be respectful and kind in all interactions',
  'Use honest and accurate profile information',
  'Communicate your intentions clearly',
  'Respect others boundaries and decisions',
  'Report suspicious or inappropriate behavior',
  'Protect your personal information',
];

const donts = [
  'Harass, bully, or threaten other users',
  'Send unsolicited explicit content',
  'Create fake or misleading profiles',
  'Ask for money or financial assistance',
  'Share others private information without consent',
  'Discriminate based on caste, religion, gender, or background',
];

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-6 text-section text-found-burgundy">Community Guidelines</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            Our community is built on respect, understanding, and genuine intentions. Here is how we keep it safe.
          </p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="card-premium">
              <h2 className="mb-4 text-2xl font-display font-semibold text-found-burgundy">Do</h2>
              <ul className="space-y-3">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <span className="text-green-600">✓</span>
                    </div>
                    <span className="text-found-plum/80">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium">
              <h2 className="mb-4 text-2xl font-display font-semibold text-found-burgundy">Do Not</h2>
              <ul className="space-y-3">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <X className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-found-plum/80">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 card-premium bg-found-plum text-white">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 flex-shrink-0 text-found-gold" />
              <div>
                <h3 className="mb-2 text-xl font-display font-semibold">Violations</h3>
                <p className="text-white/80">
                  Violations of these guidelines may result in warnings, temporary suspension, or permanent account termination. Report violations through the app or Contact page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
