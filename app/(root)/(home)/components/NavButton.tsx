"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';

interface NavButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'green';
}

const NavButton = ({
  href,
  children,
  className = '',
  variant = 'default'
}: NavButtonProps) => {
  const { navigateWithLoader } = usePageTransition();

  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-white text-gray-900 hover:bg-gray-50",
    outline: "border border-gray-300 hover:bg-gray-50 hover:text-gray-900",
    green: "bg-green-500 text-white hover:bg-green-600"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithLoader(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={combinedClasses}
    >
      {children}
    </Link>
  );
};

export default NavButton;
