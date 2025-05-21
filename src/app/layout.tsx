import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster'; // For AI feedback notifications

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IAPES Prep - Pre-ICFES Simulator',
  description: 'Your partner in preparing for the ICFES Saber 11 test.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
