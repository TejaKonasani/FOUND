import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Terms of Service</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">Last updated: November 18, 2026</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-section text-found-burgundy mb-4">Acceptance of Terms</h2>
          <p className="text-body text-found-plum/70 mb-6">By accessing or using FOUND, you agree to be bound by these Terms of Service. If you do not agree, do not use our platform.</p>
          <h2 className="text-section text-found-burgundy mb-4">Eligibility</h2>
          <p className="text-body text-found-plum/70 mb-6">You must be at least 18 years old and a consenting adult to use FOUND. By registering, you confirm you meet this requirement.</p>
          <h2 className="text-section text-found-burgundy mb-4">User Accounts</h2>
          <p className="text-body text-found-plum/70 mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information.</p>
          <h2 className="text-section text-found-burgundy mb-4">Conduct</h2>
          <p className="text-body text-found-plum/70 mb-6">You agree not to: harass or abuse other users, send spam or unsolicited messages, share false or misleading information, attempt to access others&apos; accounts, or use the platform for any illegal purpose.</p>
          <h2 className="text-section text-found-burgundy mb-4">No Guarantee of Marriage</h2>
          <p className="text-body text-found-plum/70 mb-6">FOUND provides a platform for discovery and communication. We do not guarantee marriage success, and our AI compatibility scores are suggestions, not predictions.</p>
          <h2 className="text-section text-found-burgundy mb-4">Termination</h2>
          <p className="text-body text-found-plum/70 mb-6">We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time.</p>
          <h2 className="text-section text-found-burgundy mb-4">Limitation of Liability</h2>
          <p className="text-body text-found-plum/70 mb-6">FOUND is provided &quot;as is&quot; without warranties. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
          <h2 className="text-section text-found-burgundy mb-4">Changes</h2>
          <p className="text-body text-found-plum/70">We may update these terms periodically. Continued use after changes constitutes acceptance.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
