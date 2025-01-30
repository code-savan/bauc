'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Vitali Nwaogu',
    title: 'Group Chairman',
    image: '/vitali.png'
  },
  {
    name: 'Collins Onyeaji',
    title: 'Managing Director',
    image: '/collins.png'
  },
  {
    name: 'Sandra Marcus',
    title: 'Operations Manager',
    image: '/sandra.png'
  },
  {
    name: 'Hope Gregory',
    title: 'Group HR/Admin',
    image: '/hope.png'
  },
  {
    name: 'Samuel Aji',
    title: 'Director of IT',
    image: '/aji.png'
  },
  {
    name: 'Victory Kalu-Mba',
    title: 'Head Engineer',
    image: '/kalu.png'
  },
  {
    name: 'Martin Nwannunu',
    title: 'Director of Finance',
    image: '/martin.png'
  },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display-fair text-center mb-16">Meet Our Team</h2>
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-hidden scroll-smooth px-4"
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-none w-72 group"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
                <button className="mt-4 font-space-mono text-sm text-green-600 hover:text-green-700 transition-colors">
                  VIEW PROFILE
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
