import type { Metadata, Viewport } from 'next';
import { Barlow } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Lik.com sets everything in DIN 2014 (Adobe Fonts, commercial). Barlow is the closest free (OFL) DIN-style match.
const din = Barlow({
  variable: '--font-din',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sheldonroth.com'),
  title: {
    default: 'Sheldon Roth Fine Art | Limited Edition Photography',
    template: '%s | Sheldon Roth Fine Art',
  },
  description:
    'Limited edition fine art photography by Sheldon Roth — mountains, glaciers, water and wild landscapes, signed and numbered.',
  keywords: [
    'Sheldon Roth',
    'fine art photography',
    'limited edition prints',
    'landscape photography',
    'wildlife photography',
    'acrylic photography prints',
  ],
  openGraph: {
    title: 'Sheldon Roth Fine Art',
    description: 'Limited edition fine art photography by Sheldon Roth.',
    type: 'website',
    url: 'https://sheldonroth.com',
    siteName: 'Sheldon Roth Fine Art',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Cloud Lake by Sheldon Roth' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${din.variable} antialiased`} suppressHydrationWarning>
        {children}
        {/* Cookie-free, privacy-friendly Vercel Web Analytics and Speed Insights (no consent banner needed). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
