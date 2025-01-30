
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';


const GoToTop = () => {
  return (
    <Link href={"/#"} className="fixed bottom-8 right-8 z-50 w-[50px] h-[50px] rounded-md bg-green-700 flex items-center justify-center cursor-pointer">
<ChevronUp color='white' size={18} />

  </Link>
  )
}

export default GoToTop
