'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Developer } from '@/lib/supabase/types';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    return <div className="min-h-screen flex items-center justify-center">
    <div className="loader">
  <span className="bar"></span>
  <span className="bar"></span>
  <span className="bar"></span>
</div>
  </div>;
  }

  if (!developer) {
    return <div>Developer not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
         <div className="relative h-[600px]">

            {/* Back Button */}
        <div className="absolute top-8 left-0 right-0 md:pl-20 pl-4 z-20">
          <Link
            href="/developers"
            className="flex items-center gap-2 text-white/90 cursor-pointer hover:text-white transition-colors font-space-mono group"
         >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Developers
          </Link>
        </div>

        <div className="absolute inset-0 bg-black" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className='w-[200px] h-[200px] z-20 relative mb-3'>
        <Image
          src={developer.image}
          alt={developer.title}
          width={200}
          height={200}
          className="object-cover"
          priority
        />
            </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display-fair">
          {developer.title}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: developer.content }} className="text-[16px] text-white/90 max-w-6xl font-mono leading-relaxed">

          </p>

        </div>
      </div>
      <h1 className="text-4xl font-bold mb-6"></h1>

    </main>
  );
}
