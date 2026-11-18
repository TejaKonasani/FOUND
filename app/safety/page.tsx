import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Shield, Eye, MessageSquare, Ban, Lock, Users, AlertTriangle, Phone, HelpCircle } from 'lucide-react';

const tips = [
  { icon: Eye, title: 'Protect Your Identity', text: 'Keep your phone number, email, and home address private until you trust someone.' },
  { icon: MessageSquare, title: 'Communicate on FOUND', text: 'Stay on the platform until you are comfortable. Avoid moving to unmonitored channels too quickly.' },
  { icon: AlertTriangle, title: 'Never Send Money', text: 'Never send money or financial information to someone you have only met online, no matter the reason.' },
  { icon: Lock, title: 'Verify Before Trusting', text: 'Be cautious of profiles that seem too perfect or ask for personal details early.' },
  { icon: Phone, title: 'Meet Safely', text: 'For first meetings, choose a public place, tell a friend or family member, and arrange your own transport.' },
  { icon: Ban, title: 'Report & Block', text: 'If someone makes you uncomfortable, block and report them immediately.' },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-found-blush to-white pt-32 pb-20">
        <div className="container-page text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-6 text-section text-found-burgundy">Safety & Privacy</h1>
          <p className="mx-auto max-w-2xl text-body text-found-plum/70">
            Your safety is our priority. Here is how FOUND protects you and what you can do to stay safe.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="mb-8 text-section text-found-burgundy">Safety Tips</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((t) => (
              <div key={t.title} className="card-premium">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-found-blush">
                  <t.icon className="h-6 w-6 text-found-rose" />
                </div>
                <h3 className="mb-2 text-lg font-display font-semibold text-found-burgundy">{t.title}</h3>
                <p className="text-sm text-found-plum/60">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-found-ivory">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-section text-found-burgundy">How Profile Verification Works</h2>
          <p className="mb-4 text-body text-found-plum/70 leading-relaxed">
            FOUND offers optional verification to help build trust. Verified badges indicate that a user has completed additional verification steps.
          </p>
          <p className="text-body text-found-plum/70 leading-relaxed">
            Email verification is available for all users. Photo/selfie verification is optional and processed with strict privacy controls. We do not require government ID for the MVP.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-section text-found-burgundy">How to Identify Suspicious Accounts</h2>
          <ul className="space-y-3">
            {[
              'Profiles with only one photo or very limited information',
              'Requests to move communication off-platform immediately',
              'Inconsistent or vague answers about their background',
              'Requests for money, financial help, or gift cards',
              'Reluctance to video call or meet in person after a reasonable time',
              'Profiles that seem too perfect or use stock-like photos',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-found-rose/60" />
                <span className="text-found-plum/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-found-plum text-white">
        <div className="container-page text-center">
          <HelpCircle className="mx-auto mb-4 h-12 w-12 text-found-gold" />
          <h2 className="mb-4 text-section">Need Help?</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            If you experience any safety concern, report it immediately. Our moderation team reviews all reports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn bg-white text-found-rose">Contact Support</a>
            <a href="/report" className="btn border-2 border-white/40 text-white hover:bg-white/10">Report an Account</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
