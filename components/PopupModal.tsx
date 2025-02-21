"use client"

import { useState, useEffect } from 'react'
import { X, Loader2, Leaf, User, Mail, Phone, MapPin, Briefcase, Calendar, Wallet } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Enugu", "Edo", "Ekiti", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory (FCT)"
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  interestedState: string;
  budgetRange: string;
  timeline: string;
}

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    interestedState: '',
    budgetRange: '',
    timeline: ''
  });

  useEffect(() => {
    const hasShown = localStorage.getItem('popupShown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('popupShown', 'true');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('popup_submissions').insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        occupation: formData.occupation,
        interested_state: formData.interestedState,
        budget_range: formData.budgetRange,
        timeline: formData.timeline
      }]);

      if (error) throw error;

      toast.success("Thank you for your interest! We'll be in touch soon.");
      setIsOpen(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white rounded-2xl max-w-2xl w-full h-[95vh] relative shadow-xl flex flex-col"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full p-2 backdrop-blur-sm z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-y-auto pb-10">
            <div className="p-8">
              <div className="flex justify-center mb-4">
                {/* <div className="bg-green-100 rounded-full p-3">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div> */}
              </div>
              <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Own Your Dream Home Today!</h2>
              <p className="text-xl text-center mb-1 text-green-700">Let&apos;s Tell You How</p>
              <p className="text-center text-gray-600 mb-8">We list Vetted and Credible Real Estate developers ONLY!</p>

              <form id="popup-form" onSubmit={handleSubmit} className="space-y-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Which Nigeria State Real Estate Are You Interested In?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <select
                      name="interestedState"
                      required
                      value={formData.interestedState}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    >
                      <option value="">Select a state</option>
                      {NIGERIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <input
                      type="text"
                      name="occupation"
                      required
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range (₦)
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <input
                      type="text"
                      name="budgetRange"
                      required
                      placeholder="e.g: 10,000,000-200,000,000"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeline of Purchase
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <select
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within 3 Months">Within 3 Months</option>
                      <option value="Within 6 Months">Within 6 Months</option>
                      <option value="Within 1 Year">Within 1 Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 rounded-b-2xl z-20">
            <div className=" mx-auto">
              <button
                type="submit"
                form="popup-form"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-green-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Leaf className="mr-2 h-4 w-4" />
                    Join over 215 Nigerians in diaspora!
                  </>
                )}
              </button>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">
                  Start your journey to homeownership today
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
