"use client"

import { useState, useEffect } from 'react'
import { Link2, Twitter, Instagram, Linkedin, User, Mail, MapPin, Phone, Loader2 } from "lucide-react"
import { supabase } from '@/lib/supabaseClient'
import { toast } from "sonner"
import { sendFormSubmissionNotification } from '@/lib/notificationHelper'

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: ''
  });

  // Fetch user's country on component mount
  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setFormData(prev => ({ ...prev, country: data.country_name }));
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
      const { error } = await supabase.from('contactform').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          subject: formData.subject,
          message: formData.message
        }
      ]);

      if (error) throw error;

      // Send email notification
      await sendFormSubmissionNotification('Contact Form', formData);

      toast.success("Your message has been sent successfully! We appreciate your feedback and will get back to you shortly.");
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: formData.country, // Keep the country
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="w-full grid lg:grid-cols-2 gap-16 px-6 py-16 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-6xl font-medium tracking-tight leading-[1.1]">Drop a message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">
                NAME
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                EMAIL
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-600">
                PHONE
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-600">
                SUBJECT
              </label>
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  required
                  className="w-full h-14 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-600">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                className="w-full min-h-[180px] p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 h-12 bg-[#0f1728] text-white rounded-full hover:bg-[#0f1728]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Map & Contact Info Section */}
        <div className="space-y-8">
          <div className="relative w-full h-[550px] bg-gray-50 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.755658309759!2d7.454402696789555!3d9.08600980000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b929d261bc1%3A0xf87655077fcf6153!2sKINGFEM%20GA247!5e0!3m2!1sen!2sng!4v1739528860783!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1) opacity(1)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-[16px] font-bold mb-2">Visit us</h3>
              <p className="text-[16px]">Kingfem GA247 Plot 264 Ahmadu Bello Express Way, Mabushi-Wuse 2, Abuja, FCT</p>
            </div>
          </div>

          <div className="space-x-24 flex">
            <div>
              <h3 className="text-sm font-bold mb-2">Reach out</h3>
              <a href="tel:(917) 339-6416" className="text-[16px] hover:underline text-gray-600 flex gap-2 items-center">
                <div className="p-2 bg-gray-200 rounded-full">
              <Phone strokeWidth={1.5} className="h-4 w-4" />
                </div>
                (917) 339-6416
             </a>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Social Media</h3>
              <div className="flex gap-3">
                <a href="#" className="text-black border border-gray-600 rounded-full p-2 hover:text-gray-600 transition-colors" aria-label="Twitter">
                  <Twitter strokeWidth={1.5} className="h-4 w-4" />
                </a>
                <a href="#" className="text-black bg-white border border-gray-600 rounded-full p-2 hover:text-gray-600 transition-colors" aria-label="Instagram">
                  <Instagram strokeWidth={1.5} className="h-4 w-4" />
                </a>
                <a href="#" className="text-black border border-gray-600 rounded-full p-2 hover:text-gray-600 transition-colors" aria-label="LinkedIn">
                  <Linkedin strokeWidth={1.5} className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Locations Section */}
      <div className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* UK Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6">United Kingdom</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <MapPin className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">128 City Road, London, EC1V 2NX</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <a href="tel:+447840782759" className="text-gray-600 hover:underline">
                    +44 7840 782759
                  </a>
                </div>
              </div>
            </div>

            {/* USA Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6">United States of America</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <MapPin className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">Suite 500, 123 17 Bellaire Boulevard, Houston, Texas 77072</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <a href="tel:+13464048455" className="text-gray-600 hover:underline">
                    +1 346 404 8455
                  </a>
                </div>
              </div>
            </div>

            {/* Nigeria Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6">Nigeria</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <MapPin className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">
                    Kingfem GA247 Plot 264 Ahmadu Bello Express Way, Mabushi-Wuse 2, Abuja, FCT
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  <a href="tel:+2348035933363" className="text-gray-600 hover:underline">
                    +234 803 593 3363
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
