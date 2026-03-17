import type { Metadata } from 'next';
import { Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AppHeader from '@/components/Header';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'nooluHQ',
  description:
    'This is a technical assessment test by UpCut for fullstack job posting generated with nextjs app router/api router',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', montserrat.variable)}>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <AppHeader />

        {children}
      </body>
    </html>
  );
}
