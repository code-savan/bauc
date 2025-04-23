'use client';

import { useState, useRef, useEffect } from 'react';
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
//   {
//     name: 'Sandra Marcus',
//     title: 'Operations Manager',
//     image: '/sandra.png'
//   },
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;
  const cardWidth = 288; // 72*4 = 288px (w-72 + gap)

  // Function to check scroll position and update state
  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10); // 10px buffer for rounding
    }
  };

  // Add scroll event listener to the container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  // Create a continuous scroll effect by handling edge cases
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // For continuous scrolling, if at the edge, jump to the opposite edge
      if (direction === 'right' && isAtEnd) {
        container.scrollTo({ left: 0, behavior: 'auto' });
        setTimeout(() => {
          container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 50);
      } else if (direction === 'left' && isAtStart) {
        container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'auto' });
        setTimeout(() => {
          container.scrollTo({ left: scrollWidth - clientWidth - scrollAmount, behavior: 'smooth' });
        }, 50);
      } else {
        // Normal scrolling
        const newScrollPosition = direction === 'left'
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
        container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
      }
    }
  };

  // Duplicate team members to create continuous scrolling effect
  const displayMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display-fair text-center mb-16">Meet Our Team</h2>
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth px-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayMembers.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="flex-none w-72 group snap-center"
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
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}
