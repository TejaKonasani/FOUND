import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { ForeverJourneySection } from '@/components/home/forever-journey-section';
import { MatchingSection } from '@/components/home/matching-section';
import { BeyondSection } from '@/components/home/beyond-section';
import { CultureSection } from '@/components/home/culture-section';
import { SafetySection } from '@/components/home/safety-section';
import { StoriesSection } from '@/components/home/stories-section';
import { FAQSection } from '@/components/home/faq-section';
import { FinalCTASection } from '@/components/home/final-cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ForeverJourneySection />
      <MatchingSection />
      <BeyondSection />
      <CultureSection />
      <SafetySection />
      <StoriesSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
