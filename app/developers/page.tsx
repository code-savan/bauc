'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Developer } from '@/lib/supabase/types';
import DeveloperCard from '@/components/DeveloperCard'; // Create this component to display each developer
import { Search } from 'lucide-react';
import SearchModal from '@/components/SearchModal';

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching developers:', error);
        return;
      }

      setDevelopers(data);
      setLoading(false);
    };

    fetchDevelopers();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
    <div className="loader">
  <span className="bar"></span>
  <span className="bar"></span>
  <span className="bar"></span>
</div>
  </div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
         <div className="relative h-[400px] bg-gradient-to-r from-green-900 to-green-700">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display-fair">
            Our Developers
          </h1>
          <p className="text-xl text-white/90 max-w-2xl font-inter leading-relaxed">
            Discover talented developers who can help you navigate the Nigerian real estate market.
          </p>

          <div className="relative mt-4 w-fit" onClick={() => setIsModalOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Developers..."
          className="md:w-72 w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />

      </div>
        </div>
      </div>
      {/* <h1 className="text-4xl font-bold mb-6">Our Developers</h1> */}
      <div className="space-y-6 gap-6 mt-16 pb-16">
        {developers.map(developer => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>

       {/* Search Modal */}
       <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blogs={[]} events={[]} developers={developers} />
    </main>
  );
}
