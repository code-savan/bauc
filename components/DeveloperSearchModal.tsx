'use client'

import { useState } from 'react';
import { Developer } from '@/lib/supabase/types';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface DeveloperSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  developers: Developer[];
}

const DeveloperSearchModal = ({ isOpen, onClose, developers }: DeveloperSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter developers based on the search term
  const filteredDevelopers = developers.filter(developer =>
    developer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 max-h-[500px] flex flex-col"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Search Developers</h2>
        {/* <input
          type="text"
          placeholder="Search developers..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
         <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        //   value={searchTerm}
          placeholder="Search developers..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />
      </div>

        {/* Scrollable area for the developer list */}
        <div className="flex-grow overflow-y-auto max-h-[300px]">
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map(developer => (
              <Link key={developer.id} href={`/developers/${developer.id}`} onClick={onClose}>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 transition">
                  <Image src={developer.image} alt={developer.title} width={50} height={50} className="object-cover rounded" />
                  <span>{developer.title}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>No developers found.</p>
          )}
        </div>

        {/* Close button always visible */}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DeveloperSearchModal;
