'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Developer } from '@/lib/supabase/types';
import DeveloperCard from '@/components/DeveloperCard'; // Create this component to display each developer

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">Our Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map(developer => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
    </main>
  );
}
