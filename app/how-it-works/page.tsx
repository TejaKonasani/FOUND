import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { User, Heart, Search, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: User,
    number: 1,
    title: 'Create Your Profile',
    description: 'Sign up and tell us about yourself — your background, values, and what you are looking for.',
    details: [
      'Basic details and photos',
      'Education and career',
      'Family background',
      'Culture and traditions',
      'Lifestyle and personality',
      'Marriage goals',
    ],
  },
  {
    icon: Heart,
    number: 2,
    title: 'Set Your Preferences',
    description: 'Tell us what matters most to you in a partner. Every preference has a priority level.',
    details: [
      'Age range and location',
      'Education and lifestyle',
      'Marriage timeline',
      'Family expectations',
      'Cultural preferences',
      'Must-haves vs. nice-to-haves',
    ],
  },
  {
    icon: Search,
    number: 3,
    title: 'Discover Compatible Profiles',
    description: 'Our matching engine surfaces people aligned with your values and intentions.',
    details: [
      'Transparent compatibility scores',
      'Explainable AI recommendations',
      'Filter by what matters to you',
      'Save profiles you like',
    ],
  },
  {
    icon: MessageCircle,
    number: 4,
    title: 'Express Interest',
    description: 'When you find someone interesting, express your interest. A conversation starts only when both people say yes.',
    details: [
      'Send interest requests',
      'Accept or decline requests',
      'No unwanted messages',
      'Mutual consent always',
    ],
  },
  {
    icon: ArrowRight,
    number: 5,
    title: 'Build Your Connection',
    description: 'Once matched, connect through secure messaging and explore your compatibility together.',
    details: [
      'Private, secure messaging',
      'Compatibility insights',
      'AI conversation guidance',
      'Take it at your own pace',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">How FOUND Works</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            A simple, thoughtful journey from your first profile to a meaningful connection.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-found-rose">Step {step.number}</span>
                      <h2 className="text-2xl font-display font-semibold text-found-burgundy">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mb-6 text-body text-found-plum/70 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-found-rose/60" />
                        <span className="text-found-plum/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`flex items-center ${
                    i % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="w-full rounded-3xl bg-found-ivory p-12 shadow-soft">
                    <div className="flex h-48 items-center justify-center">
                      <step.icon className="h-24 w-24 text-found-rose/20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/auth/register" className="btn-primary">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
