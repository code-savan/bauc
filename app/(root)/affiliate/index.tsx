"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AffiliateRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/affiliate/details');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting to affiliate program details...</p>
    </div>
  );
}
