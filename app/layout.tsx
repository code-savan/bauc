import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import GoToTop from './components/GoToTop';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
});

const displayFair = localFont({
    src: '../public/fonts/PlayfairDisplay-VariableFont_wght.ttf',
    variable: '--font-display-fair',
  });


export const metadata: Metadata = {
  title: 'BAUC International - Real Estate Investment Solutions',
  description: 'Professional real estate investment solutions for international investors in Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} ${displayFair.variable} font-inter`}>
        <Header />
        {children}
        <WhatsAppButton />
        <GoToTop />
        <Footer />
      </body>
    </html>
  );
}
