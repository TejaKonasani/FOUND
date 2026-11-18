import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const noto = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://found.in'),
  title: {
    default: 'FOUND — Where Understanding Becomes Forever',
    template: '%s | FOUND',
  },
  description:
    'FOUND helps you find your person and build your forever. An AI-powered Indian matrimonial platform for meaningful connections, shared values, and lifelong commitment.',
  keywords: [
    'matrimonial',
    'matrimony',
    'Indian marriage',
    'arranged marriage',
    'AI matchmaking',
    'lifelong partner',
    'FOUND',
  ],
  authors: [{ name: 'FOUND' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'FOUND',
    title: 'FOUND — Where Understanding Becomes Forever',
    description:
      'Discover meaningful connections built on shared values, genuine understanding, and dreams of a beautiful life together.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOUND — Where Understanding Becomes Forever',
    description:
      'Discover meaningful connections built on shared values, genuine understanding, and dreams of a beautiful life together.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C64B7A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${noto.variable}`}>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased',
          'selection:bg-found-rose/20 selection:text-found-plum'
        )}
      >
        {children}
      </body>
    </html>
  );
}
