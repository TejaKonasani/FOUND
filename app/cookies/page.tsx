import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CookiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <h1 className="mb-6 text-section text-found-burgundy">Cookie Policy</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">Last updated: November 18, 2026</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-section text-found-burgundy mb-4">What Are Cookies</h2>
          <p className="text-body text-found-plum/70 mb-6">Cookies are small text files stored on your device when you visit our platform. They help us provide a better experience and understand how you use FOUND.</p>
          <h2 className="text-section text-found-burgundy mb-4">How We Use Cookies</h2>
          <ul className="mb-6 space-y-2 text-body text-found-plum/70">
            <li>• Essential cookies: Enable core functionality like login and security</li>
            <li>• Preference cookies: Remember your settings and preferences</li>
            <li>• Analytics cookies: Help us understand usage patterns (anonymized)</li>
          </ul>
          <h2 className="text-section text-found-burgundy mb-4">Managing Cookies</h2>
          <p className="text-body text-found-plum/70">You can control cookies through your browser settings. Note that disabling certain cookies may affect platform functionality.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
