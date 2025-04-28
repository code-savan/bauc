"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GreenDivider from '@/app/components/GoldDivider';
import PremiumCheckbox from '@/app/components/PremiumCheckbox';
import PremiumTextarea from '@/app/components/PremiumTextarea';
import Image from 'next/image';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Initialize Supabase client - with error handling
let supabase: SupabaseClient;
try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lzabrdhnfsnulhtlpnln.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YWJyZGhuZnNudWxodGxwbmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNDk2MTYsImV4cCI6MjAyNzgyNTYxNn0.yFn0rUS5W3WkE1tX2e6zM7nK7RN8bPD3HiQnDueMVe0';
  console.log('Initializing Supabase with:', {
    url: supabaseUrl ? 'URL provided' : 'No URL',
    key: supabaseKey ? 'Key provided' : 'No key'
  });
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error('Error initializing Supabase:', error);
  // Provide a fallback client that will show errors instead of failing silently
  supabase = {
    from: () => ({
      insert: async () => {
        console.error('Supabase client not properly initialized');
        return { error: { message: 'Database connection error' } };
      }
    })
  } as unknown as SupabaseClient;
}

// For debugging
console.log('Supabase initialized:', supabase ? 'Yes' : 'No');

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Custom scrollbar styles
const scrollbarStyles = `
  .thin-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .thin-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .thin-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 3px;
  }

  .thin-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #666666;
  }

  /* For Firefox */
  .thin-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #4a4a4a transparent;
  }

  /* Toast Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

// Types
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  interestReason: string;
  experience: string;
  marketingMethods: {
    wordOfMouth: boolean;
    socialMedia: boolean;
    whatsApp: boolean;
    events: boolean;
    other: boolean;
  };
  otherMethod: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  bankCountry: string;
  termsAgreed: boolean;
  promotionMethodsOther: boolean;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  interestReason?: string;
  experience?: string;
  marketingMethods?: string;
  otherMethod?: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  bankCountry?: string;
  termsAgreed?: string;
  promotionMethodsOther?: string;
};

type SubmitResult = {
  success: boolean;
  message: string;
};

// Add the useToast hook
interface Toast {
  id: string;
  title: string;
  description?: string;
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, description?: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      title,
      description,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
}

// Add Toast UI component
const Toast = ({ title, description, onClose, index }: { title: string; description?: string; onClose: () => void; index: number }) => {
  // Set border color based on title
  let borderColor = "border-gray-900";
  let icon = null;

  if (title.toLowerCase().includes("success")) {
    borderColor = "border-green-500";
    icon = (
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    );
  } else if (title.toLowerCase().includes("error")) {
    borderColor = "border-red-500";
    icon = (
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-2">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    );
  }

  // Calculate position based on index
  const bottomPosition = `${24 + index * 100}px`;

  return (
    <div
      className={`fixed right-6 z-50 bg-white rounded-lg shadow-lg p-4 max-w-md border-l-4 ${borderColor} flex items-start gap-3 animate-fadeIn`}
      style={{ bottom: bottomPosition }}
    >
      {icon}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const AffiliateProgram = () => {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    interestReason: '',
    experience: '',
    marketingMethods: {
      wordOfMouth: false,
      socialMedia: false,
      whatsApp: false,
      events: false,
      other: false
    },
    otherMethod: '',
    accountName: '',
    bankName: '',
    accountNumber: '',
    bankCountry: '',
    termsAgreed: false,
    promotionMethodsOther: false
  });

  // State for form validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // State for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  // State for affiliate type selection
  const [affiliateType, setAffiliateType] = useState<'individual' | 'team' | null>(null);

  // Form validation function
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }

    if (!formData.interestReason.trim()) {
      errors.interestReason = 'Please describe your interest';
    }

    if (!formData.experience.trim()) {
      errors.experience = 'Please describe your experience';
    }

    const hasSelectedMethod = Object.values(formData.marketingMethods).some(value => value);
    if (!hasSelectedMethod) {
      errors.marketingMethods = 'Please select at least one marketing method';
    }

    if (formData.marketingMethods.other && !formData.otherMethod.trim()) {
      errors.otherMethod = 'Please specify other marketing method';
    }

    if (!formData.accountName.trim()) {
      errors.accountName = 'Account name is required';
    }

    if (!formData.bankName.trim()) {
      errors.bankName = 'Bank name is required';
    }

    if (!formData.accountNumber.trim()) {
      errors.accountNumber = 'Account number is required';
    }

    if (!formData.bankCountry.trim()) {
      errors.bankCountry = 'Bank country/region is required';
    }

    if (!formData.termsAgreed) {
      errors.termsAgreed = 'You must agree to the terms to proceed';
    }

    if (formData.promotionMethodsOther === false) {
      errors.promotionMethodsOther = 'Please specify how you&apos;ll promote BAUC&apos;s services';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    try {
      console.log('Preparing data for submission');
      // Convert marketing methods to string array for storage
      const marketingMethodsArray = Object.entries(formData.marketingMethods)
        .filter(([_, isSelected]) => isSelected)
        .map(([method, _]) => method);

      // Prepare data for Supabase
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        country: formData.country,
        interest_reason: formData.interestReason,
        experience: formData.experience,
        marketing_methods: marketingMethodsArray,
        other_method: formData.otherMethod || null,
        account_name: formData.accountName,
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        bank_country: formData.bankCountry,
        terms_agreed: formData.termsAgreed,
        created_at: new Date()
      };

      console.log('Submitting to Supabase:', submissionData);

      // Send email notification in parallel with database submission
      const emailPromise = fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Affiliate Program Application',
          formData: {
            ...submissionData,
            marketingMethods: marketingMethodsArray.join(', '),
          }
        }),
      });

      try {
        // Submit to Supabase
        const result = await supabase
          .from('affiliates')
          .insert([submissionData]);

        const error = result.error;
        console.log('Supabase response:', result);

        if (error) {
          throw error;
        }

        // Wait for email notification to complete
        const emailResponse = await emailPromise;
        const emailResult = await emailResponse.json();

        if (!emailResponse.ok) {
          console.warn('Email notification failed but database submission succeeded:', emailResult);
        } else {
          console.log('Email notification sent successfully:', emailResult);
        }

        // Show success message
      setSubmitResult({
        success: true,
        message: 'Thank you for your application! We will review it and contact you shortly.'
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        interestReason: '',
        experience: '',
        marketingMethods: {
          wordOfMouth: false,
          socialMedia: false,
          whatsApp: false,
          events: false,
          other: false
        },
        otherMethod: '',
        accountName: '',
        bankName: '',
        accountNumber: '',
        bankCountry: '',
          termsAgreed: false,
          promotionMethodsOther: false
        });

        // Show success toast and redirect after a delay
        showToast('Success', 'Your application has been submitted successfully! You will receive a confirmation email within 3–5 business days.');
        console.log('Redirecting to home page');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error toast
      showToast('Error', 'There was an error submitting your application. Please try again later or contact support.');

      // Also set the error in the UI
      setSubmitResult({
        success: false,
        message: 'There was an error submitting your application. Please try again later.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen bg-[#f5f5f7]">
      <style jsx global>{scrollbarStyles}</style>
      <div className=" overflow-hidden mx-auto p-2 flex flex-col lg:flex-row">
        {/* Left column - Form */}
        <div className="w-full lg:w-1/2 lg:pr-8 lg:py-16 md:py-6 overflow-auto thin-scrollbar">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight mt-5 md:mt-0">BAUC INTERNATIONAL AFFILIATE APPLICATION FORM</h1>

            {/* Mobile testimonial section - only visible on mobile */}
            <div className="mb-8 lg:hidden">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-3 py-4 rounded-xl text-white shadow-lg relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 z-0 p-2">
                  <Image
                    src="/hero.jpg"
                    alt="Background"
                    fill
                    className="object-cover object-center opacity-60"
                  />
                </div>

                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/60 mix-blend-multiply z-10"></div>

                {/* Diagonal lines for visual effect */}
                {/* <div className="absolute inset-0 opacity-10 z-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute transform rotate-45 bg-slate-600"
                      style={{
                        height: '300%',
                        width: '10px',
                        left: `${i * 40}px`,
                        top: '-150%'
                      }}
                    ></div>
                  ))}
                </div> */}

                <p className="text-[16px] leading-relaxed mb-2 font-light relative z-30">
                  At BAUC International, we partner with individuals across the globe who share our passion for promoting credible, secure, and verified real estate investments in Nigeria.
                </p>
                <p className="text-[16px] leading-relaxed mb-3 font-light relative z-30">
                  As an affiliate, you&apos;ll earn <span className='font-bold'>30% Net commission</span> on every successful client purchase.
                </p>
                <div className='flex items-center gap-3 relative z-30 border-t border-white/20 pt-4'>
                  <div className='rounded-full bg-black/50 flex items-center justify-center w-14 h-14 p-0.5 border border-gray-700 shadow-sm'>
                    <Image src="/collins.png" alt="Collins Onyeaji" width={55} height={55} className="rounded-full" />
        </div>
                  <div>
                    <h3 className="text-xl font-semibold">Collins Onyeaji</h3>
                    <p className="text-white/80 font-inter">Managing Director</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="h-px bg-gray-200 w-full my-8 lg:hidden"></div> */}

            <p className="text-gray-600 mb-8 text-[14px] font-medium">
            Please complete the form below to apply:
            You will receive a <br /> confirmation email within 3–5 business days upon review.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PERSONAL INFORMATION */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">PERSONAL INFORMATION</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (with country code): <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Residential Address: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent mb-2"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {/* <input
                      type="text"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      placeholder="Address line 2 (optional)"
                    /> */}
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country of Residence: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ABOUT YOU */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ABOUT YOU</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="interestReason" className="block text-sm font-medium text-gray-700 mb-1">
                      Why are you interested in becoming a BAUC affiliate? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="interestReason"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.interestReason}
                      onChange={(e) => setFormData({ ...formData, interestReason: e.target.value })}
                    ></textarea>
                    {formErrors.interestReason && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.interestReason}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have experience in real estate, marketing, or sales? If yes, briefly describe: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="experience"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    ></textarea>
                    {formErrors.experience && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.experience}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How do you intend to promote BAUC&apos;s services? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingMethod-wordOfMouth"
                        checked={formData.marketingMethods.wordOfMouth}
                          onChange={(e) => setFormData({
                          ...formData,
                          marketingMethods: {
                            ...formData.marketingMethods,
                              wordOfMouth: e.target.checked
                            }
                          })}
                          className="mr-2 mt-1"
                        />
                        <label htmlFor="marketingMethod-wordOfMouth" className="text-sm text-gray-700">
                          Word-of-mouth (friends/family/community)
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingMethod-socialMedia"
                        checked={formData.marketingMethods.socialMedia}
                          onChange={(e) => setFormData({
                          ...formData,
                          marketingMethods: {
                            ...formData.marketingMethods,
                              socialMedia: e.target.checked
                            }
                          })}
                          className="mr-2 mt-1"
                        />
                        <label htmlFor="marketingMethod-socialMedia" className="text-sm text-gray-700">
                          Social Media (Instagram, TikTok, etc.)
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingMethod-whatsApp"
                        checked={formData.marketingMethods.whatsApp}
                          onChange={(e) => setFormData({
                          ...formData,
                          marketingMethods: {
                            ...formData.marketingMethods,
                              whatsApp: e.target.checked
                            }
                          })}
                          className="mr-2 mt-1"
                        />
                        <label htmlFor="marketingMethod-whatsApp" className="text-sm text-gray-700">
                          WhatsApp broadcasts/groups
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingMethod-events"
                        checked={formData.marketingMethods.events}
                          onChange={(e) => setFormData({
                          ...formData,
                          marketingMethods: {
                            ...formData.marketingMethods,
                              events: e.target.checked
                            }
                          })}
                          className="mr-2 mt-1"
                        />
                        <label htmlFor="marketingMethod-events" className="text-sm text-gray-700">
                          Events or diaspora community outreach
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketingMethod-other"
                          checked={formData.marketingMethods.other}
                          onChange={(e) => setFormData({
                            ...formData,
                            marketingMethods: {
                              ...formData.marketingMethods,
                              other: e.target.checked
                            }
                          })}
                          className="mr-2 mt-1"
                        />
                        <label htmlFor="marketingMethod-other" className="text-sm text-gray-700">
                          Other:
                        </label>

                        {formData.marketingMethods.other && (
                          <input
                            type="text"
                            id="otherMethod"
                            className="ml-2 p-1 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent w-48"
                            value={formData.otherMethod}
                            onChange={(e) => setFormData({ ...formData, otherMethod: e.target.value })}
                          />
                        )}
                      </div>
                    </div>
                    {formErrors.marketingMethods && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.marketingMethods}</p>
                    )}
                    {formData.marketingMethods.other && formErrors.otherMethod && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.otherMethod}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BANK ACCOUNT DETAILS */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">BANK ACCOUNT DETAILS (For Commission Payments)</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    />
                    {formErrors.accountName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.accountName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                    {formErrors.bankName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.bankName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                    {formErrors.accountNumber && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.accountNumber}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bankCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      Country/Region of Bank: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankCountry"
                      className="w-full p-2 border-b border-gray-300 focus:border-green-600 focus:outline-none bg-transparent"
                      value={formData.bankCountry}
                      onChange={(e) => setFormData({ ...formData, bankCountry: e.target.value })}
                    />
                    {formErrors.bankCountry && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.bankCountry}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Promotion Methods Other */}
              <div className="text-sm text-gray-700 mb-6">
                <div className="mb-2 flex items-start">
                  <input
                    type="checkbox"
                    id="promotionMethodsOther"
                    checked={formData.promotionMethodsOther}
                    onChange={(e) => setFormData({ ...formData, promotionMethodsOther: e.target.checked })}
                    className="mr-2 mt-1"
                  />
                  <label htmlFor="promotionMethodsOther" className="flex-1">
                    I will actively promote BAUC&apos;s services through my network and marketing channels
                  </label>
                </div>
                {formErrors.promotionMethodsOther && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.promotionMethodsOther}</p>
                )}
                </div>

              {/* TERMS & AGREEMENT */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">TERMS & AGREEMENT</h3>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700">By submitting this form:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>I confirm that the information provided is accurate.</li>
                    <li>I agree not to misrepresent BAUC International&apos;s services.</li>
                    <li>I understand that I will receive 30% commission on each verified sale made through my direct referral.</li>
                    <li>I consent to BAUC contacting me via phone or email regarding my affiliate application and activity.</li>
                  </ul>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAgreed"
                      checked={formData.termsAgreed}
                    onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                    className="mr-2 mt-1"
                  />
                  <label htmlFor="termsAgreed" className="text-sm text-gray-700">
                    I agree to the terms and conditions outlined above.
                  </label>
                </div>
                    {formErrors.termsAgreed && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.termsAgreed}</p>
                    )}
                </div>

              {/* Submit button */}
                  <button
                    type="submit"
                className="w-full bg-green-500 hover:bg-green-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                    disabled={submitting}
                  >
                    {submitting ? (
                  <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    Processing...
                  </div>
                ) : 'SUBMIT'}
                  </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                You will receive a confirmation email within 3–5 business days upon review.
              </p>

              {submitResult && (
                <div className={`p-4 rounded-lg mt-4 ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitResult.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right column - Image and testimonial */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 relative overflow-hidden rounded-xl hidden lg:flex flex-col items-end">
          {/* <div className="absolute inset-0 bg-purple-200 z-0 grid grid-cols-8 grid-rows-8 opacity-60">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-white border-opacity-20"></div>
            ))}
          </div> */}

          {/* <div className="relative z-10 h-full flex flex-col justify-between p-10"> */}

                  <div className="absolute right-0 top-0 bottom-0 w-full h-full bg-black">
                    <Image
                      src="/hero.jpg"
                      alt="Affiliate testimonial"
                      fill
                      className="object-cover object-center "
                    />
                <div className="absolute inset-0 left-0 top-0 bottom-0 flex items-center justify-center z-10">
                  <div className="w-full h-full rounded-full bg-black/90 opacity-50 blur-3xl"></div>
                      </div>


                {/* diagonal lines  */}
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/30 mix-blend-multiply">
                    <div className="absolute inset-0">

                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute transform rotate-45 bg-gray-900/10"
                          style={{
                            height: '300%',
                            width: '20px',
                            left: `${i * 70 - 200}px`,
                            top: '-120%'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

              </div>


            <div className="text-white z-20 mt-auto px-8 pb-10 font-inter">
              <p className="text-[16px] leading-relaxed mb-6 font-light italic ">
                At BAUC International, we partner with individuals across the globe who share our passion for promoting credible, secure, and verified real estate investments in Nigeria. <br /> As an affiliate, you&apos;ll earn <span className='font-bold'>30% Net commission</span>  on every successful client purchase.
              </p>
              <div className='flex items-center gap-3'>
                <div className='rounded-full bg-black/50 flex items-center
                justify-center w-12 h-12 p-2'>
                    <Image src="/collins.png" alt="Collins Onyeaji"
                    width={50} height={50} className="rounded-full" />
                </div>
                <div>
                <h3 className="text-xl font-semibold">Collins Onyeaji</h3>
                <p className="text-white/80 font-inter">Managing Director</p>
                </div>
              </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Toast notifications */}
      {toasts.map((toast, index) => (
        <Toast key={toast.id} title={toast.title} description={toast.description} onClose={() => removeToast(toast.id)} index={index} />
      ))}
    </main>
  );
};

export default AffiliateProgram;
