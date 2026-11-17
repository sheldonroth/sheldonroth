import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({
  variable: '--font-serif-face',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sans = Montserrat({
  variable: '--font-sans-face',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
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
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
