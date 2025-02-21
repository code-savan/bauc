'use client'

import { useState } from 'react';
import ContactSection from '@/components/ContactSection';



export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen">
         <div className="relative h-[400px] bg-gradient-to-r from-green-900 to-green-700">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display-fair">
            Contact Us Today
          </h1>
          <p className="text-xl text-white/90 max-w-2xl font-inter leading-relaxed">
            Get in touch with our expert team to explore opportunities in the Nigerian real estate market.
          </p>

        </div>
      </div>
        <ContactSection />
    </main>
  );
}
