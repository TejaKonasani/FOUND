import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Privacy Policy</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">Last updated: November 18, 2026</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl prose prose-found max-w-none">
          <h2 className="text-section text-found-burgundy mb-4">Introduction</h2>
          <p className="text-body text-found-plum/70 mb-6">FOUND (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our matrimonial platform.</p>
          <h2 className="text-section text-found-burgundy mb-4">Information We Collect</h2>
          <p className="text-body text-found-plum/70 mb-6">We collect information you provide directly to us, including: account credentials, profile information (name, age, location, education, career, family background, cultural preferences, lifestyle, personality answers, marriage goals, partner preferences), photos, and communications.</p>
          <h2 className="text-section text-found-burgundy mb-4">How We Use Your Information</h2>
          <p className="text-body text-found-plum/70 mb-6">We use your information to: create and manage your account, match you with compatible profiles, facilitate communication, improve our services, ensure safety and security, and comply with legal obligations.</p>
          <h2 className="text-section text-found-burgundy mb-4">Data Sharing</h2>
          <p className="text-body text-found-plum/70 mb-6">We do not sell your personal information. We share information only: with your consent, to facilitate matches and messaging between users, with service providers who assist our operations, and when required by law.</p>
          <h2 className="text-section text-found-burgundy mb-4">Your Rights</h2>
          <p className="text-body text-found-plum/70 mb-6">You have the right to access, correct, delete, and export your data. You can also control profile visibility and delete your account at any time from your settings.</p>
          <h2 className="text-section text-found-burgundy mb-4">Data Retention</h2>
          <p className="text-body text-found-plum/70 mb-6">We retain your data only as long as necessary to provide our services and comply with legal obligations. Upon account deletion, we remove your data according to our retention schedule.</p>
          <h2 className="text-section text-found-burgundy mb-4">Contact</h2>
          <p className="text-body text-found-plum/70">For privacy concerns, contact us through the Contact page.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
