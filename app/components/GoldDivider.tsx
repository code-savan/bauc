import React from 'react';

interface GreenDividerProps {
  className?: string;
}

const GreenDivider: React.FC<GreenDividerProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-0.5 bg-gradient-to-r from-green-300 to-green-600 ${className}`} />
  );
};

export default GreenDivider;
