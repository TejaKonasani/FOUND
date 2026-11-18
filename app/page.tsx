import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { DifferentSection } from '@/components/home/different-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { BeyondSection } from '@/components/home/beyond-section';
import { AIPreviewSection } from '@/components/home/ai-preview-section';
import { CultureSection } from '@/components/home/culture-section';
import { SafetySection } from '@/components/home/safety-section';
import { StoriesSection } from '@/components/home/stories-section';
import { FAQSection } from '@/components/home/faq-section';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DifferentSection />
      <HowItWorksSection />
      <BeyondSection />
      <AIPreviewSection />
      <CultureSection />
      <SafetySection />
      <StoriesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
