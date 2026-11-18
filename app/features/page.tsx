import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  User, Heart, Sparkles, MessageCircle, Star, Shield,
  Users, Lock, Camera, Bell, Sliders, FileText,
} from 'lucide-react';

const featureGroups = [
  {
    title: 'Profile & Discovery',
    features: [
      { icon: User, name: 'Detailed Profiles', status: 'available', desc: 'Comprehensive profiles covering values, lifestyle, family, and goals.' },
      { icon: Sliders, name: 'Smart Filters', status: 'available', desc: 'Filter by age, location, language, lifestyle, and more.' },
      { icon: Camera, name: 'Photo Gallery', status: 'available', desc: 'Upload and organize multiple photos with privacy controls.' },
      { icon: Star, name: 'Favorites', status: 'available', desc: 'Save profiles you are interested in for later.' },
    ],
  },
  {
    title: 'Matching & Compatibility',
    features: [
      { icon: Sparkles, name: 'AI-Assisted Matching', status: 'available', desc: 'Transparent, explainable compatibility scoring.' },
      { icon: Heart, name: 'Compatibility Reports', status: 'available', desc: 'Detailed breakdown of shared values and differences.' },
      { icon: FileText, name: 'Partner Preferences', status: 'available', desc: 'Set must-haves, strong preferences, and nice-to-haves.' },
    ],
  },
  {
    title: 'Connection & Communication',
    features: [
      { icon: MessageCircle, name: 'Secure Messaging', status: 'available', desc: 'Private messaging between matched users.' },
      { icon: Users, name: 'Mutual Interest', status: 'available', desc: 'Express interest; conversations start only on mutual acceptance.' },
      { icon: Bell, name: 'Notifications', status: 'available', desc: 'Stay updated on interests, messages, and matches.' },
    ],
  },
  {
    title: 'Privacy & Safety',
    features: [
      { icon: Shield, name: 'Verification', status: 'available', desc: 'Optional verification to build trust.' },
      { icon: Lock, name: 'Privacy Controls', status: 'available', desc: 'Control who sees your profile and photos.' },
      { icon: Users, name: 'Family Involvement', status: 'coming', desc: 'Invite family to view selected details (coming soon).' },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Features</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            Everything you need to find your person and build your forever — thoughtfully designed.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="space-y-12">
            {featureGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-6 text-2xl font-display font-semibold text-found-burgundy">
                  {group.title}
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.features.map((f) => (
                    <div key={f.name} className="card-premium">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-found-blush">
                          <f.icon className="h-6 w-6 text-found-rose" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            f.status === 'available'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-found-champagne text-found-burgundy'
                          }`}
                        >
                          {f.status === 'available' ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-display font-semibold text-found-burgundy">
                        {f.name}
                      </h3>
                      <p className="text-sm text-found-plum/60">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
