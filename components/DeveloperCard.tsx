'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Developer } from '@/lib/supabase/types';

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="bg-white shadow-sm mx-auto max-w-5xl flex h-[220px] items-center">
      <div className="relative h-full w-[250px] flex items-center justify-center">
        <Image
          src={developer.image}
          alt={developer.title}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
      <div className="py-4 px-8 w-full">
        <h3 className="text-[23px] font-semibold">{developer.title}</h3>
        <p className="text-gray-600 line-clamp-3 w-[90%]" dangerouslySetInnerHTML={{ __html: developer.content }} />

    <div className="mt-2">
        <Link href={`/developers/${developer.id}`} className="text-blue-600 text-sm font-space-mono group-hover:underline">
          View Properties →
        </Link>
    </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
