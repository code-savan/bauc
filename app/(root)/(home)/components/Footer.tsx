"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner";
import { Loader2, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's country on mount
  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setCountry(data.country_name);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };
    getCountry();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, check if the email exists
      const { data: existingSubscriber, error: fetchError } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw fetchError;
      }

      if (existingSubscriber) {
        // Email exists, check status
        if (existingSubscriber.status === 'subscribed') {
          toast.error("This email is already subscribed to our newsletter.");
          return;
        } else {
          // Email exists but unsubscribed - update status
          const { error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({ status: 'subscribed' })
            .eq('email', email);

          if (updateError) throw updateError;

          toast.success("Welcome back! Your subscription has been reactivated.");
          setEmail('');
        }
      } else {
        // New subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscribers')
          .insert([
            {
              email,
              country,
              status: 'subscribed'
            }
          ]);

        if (insertError) throw insertError;

        toast.success("Thank you for subscribing to our newsletter!");
        setEmail('');
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error("Failed to process subscription. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-6 py-16">
        {/* Top Section - Reduced gap from 12 to 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Image src="/logo-dark.png" alt="BAUC International" width={180} height={180} className="mb-4" />
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner in real estate investment, providing vetted properties and comprehensive solutions across Africa.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Global Offices */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-semibold text-white">Global Offices</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">United Kingdom</h4>
                <p className="text-sm text-gray-400">128 City Road, London, EC1V 2NX</p>
                <a href="tel:+447840782759" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +44 7840 782759
                </a>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">United States</h4>
                <p className="text-sm text-gray-400">Suite 500, 123 17 Bellaire Boulevard,<br />Houston, Texas 77072</p>
                <a href="tel:+13464048455" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +1 346 404 8455
                </a>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Nigeria</h4>
                <p className="text-sm text-gray-400">Kingfem GA247 Plot 264 Ahmadu Bello Express Way,<br />Mabushi-Wuse 2, Abuja, FCT</p>
                <a href="tel:+2348035933363" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +234 803 593 3363
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - Increased from 2 to 2.5 */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/vetted-properties" className="text-sm text-gray-400 hover:text-white transition-colors">Vetted Properties</Link></li>
              <li><Link href="/affiliate" className="text-sm text-gray-400 hover:text-white transition-colors">Affiliate</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/events" className="text-sm text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/expression-of-interest" className="text-sm text-gray-400 hover:text-white transition-colors">Expression of Interest</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter - Increased from 2 to 2.5 */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pr-4 pl-[35px] py-3 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:border-gray-600 text-white placeholder:text-gray-500 text-sm"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Reduced top margin from 12 to 8 */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} BAUC INTERNATIONAL. <span className="text-gray-600">All Rights Reserved.</span></p>
          <p className="text-sm text-gray-600">Vetting Real Estate In Africa</p>
        </div>
      </div>
    </footer>
  );
}
