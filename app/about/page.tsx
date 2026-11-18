import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/logo';
import { Heart, Users, Sparkles, Shield, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Heart,
    title: 'Understanding First',
    description: 'We believe lasting partnerships begin with genuine understanding, not surface-level attraction.',
  },
  {
    icon: Users,
    title: 'Respect for Individuality',
    description: 'Every person is unique. We honor your traditions while celebrating your individual choices.',
  },
  {
    icon: Sparkles,
    title: 'Transparent AI',
    description: 'Our matching is explainable. You always know why we recommend someone — no black boxes.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Your privacy and security are non-negotiable. Built into every feature from day one.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <Logo className="mx-auto mb-6 h-14 w-auto" />
          <h1 className="mb-6 text-section text-found-burgundy">About FOUND</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            We&apos;re building the matrimonial platform we always wished existed — one that
            helps you find not just a match, but a true understanding partner for life.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-section text-found-burgundy">Our Story</h2>
          <div className="space-y-4 text-body text-found-plum/70 leading-relaxed">
            <p>
              FOUND was born from a simple observation: modern matrimonial platforms
              often reduce life partners to a checklist of attributes. Swiping,
              endless filters, and algorithmic scores miss what truly matters —
              understanding, shared values, and the willingness to grow together.
            </p>
            <p>
              We set out to create something different. A platform that combines
              the wisdom of Indian marriage traditions with modern technology,
              where AI assists but never replaces human judgment, and where your
              privacy and consent are protected at every step.
            </p>
            <p>
              FOUND is for adults who believe that marriage is a partnership built
              on mutual respect, shared dreams, and a deep understanding of one
              another. Where Understanding Becomes Forever.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-found-ivory">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-section text-found-burgundy">Our Mission</h2>
            <p className="text-body text-found-plum/70 leading-relaxed">
              To help consenting adults across India discover meaningful,
              long-term partnerships through a platform that values understanding
              over superficial matching, respects cultural diversity, and puts
              privacy and safety first.
            </p>
          </div>
        </div>
      </section>

      {/* Why Meaningful Matchmaking */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-section text-found-burgundy">
            Why Meaningful Matchmaking Matters
          </h2>
          <p className="mb-6 text-body text-found-plum/70 leading-relaxed">
            A marriage is one of the most significant decisions in a person&apos;s life.
            It shapes your daily happiness, your family, and your future. That&apos;s
            why we focus on what creates lasting partnerships:
          </p>
          <ul className="space-y-4">
            {[
              'Shared core values and life goals',
              'Compatible communication and conflict-resolution styles',
              'Aligned expectations about family and traditions',
              'Mutual respect and emotional support',
              'Similar visions for the future',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-rose">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-found-plum/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Approach to AI */}
      <section className="section-padding bg-found-lavender/30">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-section text-found-burgundy">Our Approach to AI</h2>
          <p className="mb-4 text-body text-found-plum/70 leading-relaxed">
            We use AI as a helpful assistant, not an oracle. Our matching engine
            provides explainable suggestions based on the information you choose to
            share. It helps you discover compatible people and start meaningful
            conversations — but the final decision is always yours.
          </p>
          <p className="text-body text-found-plum/70 leading-relaxed">
            We never claim our compatibility scores predict marriage success.
            Relationships are built by two people, not an algorithm.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="heading-section">
            <h2>What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card-premium text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-found-blush">
                  <v.icon className="h-7 w-7 text-found-rose" />
                </div>
                <h3 className="mb-2 text-lg font-display font-semibold text-found-burgundy">
                  {v.title}
                </h3>
                <p className="text-sm text-found-plum/60">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-padding bg-found-plum text-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="mb-6 text-section">Our Commitment to You</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/80 leading-relaxed">
            We are committed to building a safe, respectful, and inclusive platform
            where every adult can explore meaningful connections on their own terms.
            Your trust is our foundation.
          </p>
          <Link href="/auth/register" className="btn bg-white text-found-rose">
            Start Your Journey
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
