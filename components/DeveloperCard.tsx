'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Developer } from '@/lib/supabase/types';

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={developer.image}
          alt={developer.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{developer.title}</h3>
        <p className="text-gray-600">{developer.content}</p>
        <Link href={`/developers/${developer.id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DeveloperCard;
