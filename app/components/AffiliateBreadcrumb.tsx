"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface AffiliateBreadcrumbProps {
  currentPage: 'details' | 'form';
}

const AffiliateBreadcrumb: React.FC<AffiliateBreadcrumbProps> = ({ currentPage }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 py-4 px-4 md:px-0">
      <Link href="/" className="hover:text-green-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      {currentPage === 'form' ? (
        <>
          <Link href="/affiliate/details" className="hover:text-green-600 transition-colors">
            Affiliate Program
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Application Form</span>
        </>
      ) : (
        <span className="text-gray-900 font-medium">Affiliate Program</span>
      )}
    </nav>
  );
};

export default AffiliateBreadcrumb;
