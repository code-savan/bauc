'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Developer } from '@/lib/supabase/types';
import Image from 'next/image';

export default function DeveloperDetailsPage() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching developer:', error);
        return;
      }

      setDeveloper(data);
      setLoading(false);
    };

    fetchDeveloper();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!developer) {
    return <div>Developer not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">{developer.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Image src={developer.image} alt={developer.title} width={500} height={300} className="object-cover" />
        <p className="mt-4" dangerouslySetInnerHTML={{ __html: developer.content }} />
      </div>
    </main>
  );
}
