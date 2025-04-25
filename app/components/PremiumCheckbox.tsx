import React from 'react';

interface PremiumCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const PremiumCheckbox: React.FC<PremiumCheckboxProps> = ({
  label,
  checked,
  onChange,
  className = ""
}) => {
  return (
    <label className={`flex items-start cursor-pointer group ${className}`}>
      <div className="flex items-center h-6">
        <div
          className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
            checked
              ? 'bg-gradient-to-r from-green-400 to-green-600 border-green-500'
              : 'bg-white border-gray-300 group-hover:border-green-400'
          }`}
          onClick={() => onChange(!checked)}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default PremiumCheckbox;
