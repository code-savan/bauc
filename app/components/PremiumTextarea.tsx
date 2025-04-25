import React from 'react';

interface PremiumTextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  error?: string;
}

const PremiumTextarea: React.FC<PremiumTextareaProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  className = '',
  rows = 5,
  error
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-800 bg-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={onChange}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default PremiumTextarea;
