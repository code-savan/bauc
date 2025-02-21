import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import GoToTop from './components/GoToTop';
import { Toaster } from "sonner";
import PopupModal from '@/components/PopupModal';




export const metadata: Metadata = {
  title: 'BAUC International - Real Estate Investment Solutions',
  description: 'Professional real estate investment solutions for international investors in Nigeria.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={``}>
        <Header />
        {children}
        <WhatsAppButton />
        <GoToTop />
        <Footer />
        <PopupModal />
        <Toaster />
      </body>
    </html>
  );
}
