import type { Metadata, Viewport } from 'next';
import { Barlow } from 'next/font/google';
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
    'Limited edition fine art photography by Sheldon Roth — landscapes, seascapes, wildlife and architecture, hand-signed and numbered.',
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
    images: [{ url: '/works/coral-symphony.jpg', width: 2560, height: 1707 }],
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
      </body>
    </html>
  );
}
