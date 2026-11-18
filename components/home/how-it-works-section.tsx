'use client';

import { motion } from 'framer-motion';
import { User, Heart, Search, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: User,
    number: '01',
    title: 'Tell Us About Yourself',
    description:
      'Share your background, values, and what you&apos;re looking for in a life partner through our thoughtful onboarding.',
  },
  {
    icon: Heart,
    number: '02',
    title: 'Share What Matters Most',
    description:
      'Set your preferences for marriage goals, lifestyle, traditions, and family expectations.',
  },
  {
    icon: Search,
    number: '03',
    title: 'Discover Compatible People',
    description:
      'Our matching engine surfaces profiles aligned with your values and intentions.',
  },
  {
    icon: MessageCircle,
    number: '04',
    title: 'Build Meaningful Conversations',
    description:
      'Connect through secure messaging when there&apos;s mutual interest.',
  },
  {
    icon: ArrowRight,
    number: '05',
    title: 'Take Your Journey Forward',
    description:
      'At your own pace, explore compatibility and build a foundation for forever.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-found-blush/50">
      <div className="container-page">
        <div className="heading-section">
          <h2>How FOUND Works</h2>
          <p>
            A thoughtful journey from first introduction to meaningful connection.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-found-rose/20 via-found-rose/40 to-found-rose/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="card-premium relative flex flex-col items-center text-center h-full">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-rose text-xs font-bold text-white shadow-glow">
                    {step.number}
                  </div>

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-found-blush">
                    <step.icon className="h-8 w-8 text-found-rose" />
                  </div>

                  <h3 className="mb-2 text-lg font-display font-semibold text-found-burgundy">
                    {step.title}
                  </h3>
                  <p className="text-sm text-found-plum/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/auth/register" className="btn-primary">
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
