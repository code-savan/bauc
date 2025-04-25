// UI components for premium affiliate form
import React from 'react';
import { motion } from 'framer-motion';

// Colors
export const colors = {
  royalBlue: '#1E40AF', // deep royal blue
  gold: '#D4AF37',      // classic gold
  lightGold: '#F7F0D4',
  darkBlue: '#0F2167',
};

// Gold section divider
export const GoldDivider = () => (
  <div className="my-12 w-full">
    <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
  </div>
);

// Premium form label with gold accent
export const FormLabel: React.FC<{
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({ htmlFor, children, required = false }) => (
  <div className="flex items-center mb-2">
    <div className="w-1 h-5 bg-amber-400 mr-2 rounded-full"></div>
    <label htmlFor={htmlFor} className="text-sm font-semibold uppercase tracking-wider text-gray-700">
      {children} {required && <span className="text-blue-600">*</span>}
    </label>
  </div>
);

// Fancy checkbox with animation
export const PremiumCheckbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
}> = ({ id, label, checked, onChange, required = false, icon }) => (
  <div className="relative flex items-start py-2">
    <div className="mr-3 flex h-6 items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-6 w-6 rounded-md border-amber-300 text-blue-800 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 transition-all duration-200"
      />
    </div>
    <div className="text-base leading-6">
      <label htmlFor={id} className="flex items-center text-gray-700 font-medium gap-2">
        {icon && <span className="text-amber-500">{icon}</span>}
        {label}
      </label>
    </div>
  </div>
);

// Progress indicator
export const ProgressIndicator: React.FC<{
  progress: number;
  isSubmitting: boolean;
}> = ({ progress, isSubmitting }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between text-xs uppercase tracking-wide text-gray-500 mb-2">
      <span>Step 1 of 1</span>
      <span>{isSubmitting ? 'Submitting...' : `${progress}% Complete`}</span>
    </div>
    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="h-full bg-gradient-to-r from-blue-800 to-amber-400"
      />
    </div>
  </div>
);

// Social media icons for checkboxes
export const WordOfMouthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 6.1H3"></path>
    <path d="M21 12.1H3"></path>
    <path d="M15.1 18H3"></path>
  </svg>
);

export const SocialMediaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const EventsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const OtherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

// Custom gold bullet for list items
export const GoldBullet = () => (
  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 shadow-sm shadow-amber-200"></div>
);
