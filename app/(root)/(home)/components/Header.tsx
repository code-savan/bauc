'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Contact,
  X,
  Info
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/about", label: "About Us", icon: <Info className="w-5 h-5" /> },
    { href: "/vetted-properties", label: "Vetted Properties", icon: <Building2 className="w-5 h-5" /> },
    { href: "/affiliate/details", label: "Affiliate", icon: <Users className="w-5 h-5" /> },
    { href: "/blogs", label: "Blogs", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "/expression-of-interest", label: "Expression of Interest", icon: <FileText className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Contact className="w-5 h-5" /> },
  ];

  return (
    <header className="w-full relative md:h-[137px]">
      {/* Top Bar */}
      <div className="bg-black py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex flex-wrap gap-1 items-center md:justify-between justify-center md:w-[75%] w-full mx-auto">
            <a href="tel:+447840782759" className="text-white hover:text-white/80 block">
              +447840782759
            </a>
            <a href="tel:+2348113822048" className="text-white hover:text-white/80 block">
              +2348113822048
            </a>
            <a href="mailto:vet@baucinternational.com" className="text-white hover:text-white/80 block">
              vet@baucinternational.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          <Link href="/" className="flex items-center pb-2 md:pb-0">
            {/* <span className="text-2xl font-bold text-green-600">BAUC International</span> */}
            <Image src={"/logo.png"} alt='logo' className='w-[120px] md:w-[200px]' width={200} height={200} />
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-green-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            <div className="container mx-auto px-4 pt-24">
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-4 text-gray-600 hover:text-green-600 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
