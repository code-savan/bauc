'use client';

import { useState } from 'react';
import Image from 'next/image';

type InvestmentReason = {
  id: number;
  title: string;
  description: string;
  content: string | React.ReactNode;
};

const investmentReasons: InvestmentReason[] = [
  {
    id: 1,
    title: 'Leverage the Higher Purchasing Power of Foreign Currency',
    description: 'Foreign currencies have seen massive appreciation against the Naira in the past five years.',
    content: 'This means that with as little as $5,000, you can make a significant contribution toward a profitable real estate investment in Nigeria.'
  },
  {
    id: 2,
    title: 'Enjoy Higher Returns on Investment (ROI)',
    description: 'Nigeria\'s real estate market offers impressive returns, with average ROI standing at:',
    content: (
      <>
        <span className="block mb-2">• 25% for Residential Properties</span>
        <span className="block">• 35% for Commercial Properties</span>
        <p className="mt-2">Investing now ensures you maximize these high-yield opportunities.</p>
      </>
    )
  },
  {
    id: 3,
    title: 'Access Affordable Mortgage Plans & Financial Partnerships',
    description: 'Securing real estate in Nigeria is now easier than ever with flexible and affordable 10-year+ mortgage plans',
    content: 'Property ownership is now seamless and attainable with our range of financial partnerships tailored to your investment goals.'
  },
  {
    id: 4,
    title: 'Diversify Your Investment Portfolio',
    description: 'Expand your income streams by earning rental income from Nigeria\'s booming real estate sector.',
    content: 'Property investments provide a reliable and sustainable way to grow wealth and minimize financial risks through diversification.'
  },
  {
    id: 5,
    title: 'Grow Wealth Through Capital Appreciation',
    description: 'Nigeria\'s real estate sector guarantees steady capital appreciation, with property values increasing by up to 30% annually',
    content: 'This continuous growth ensures long-term financial stability and significant returns on your initial investment.'
  },
  {
    id: 6,
    title: 'Secure Your Financial Future',
    description: 'Start building your capital security today and retire wealthy by investing in Nigeria\'s thriving property market.',
    content: 'A real estate investment today guarantees a more secure and prosperous tomorrow with reliable passive income.'
  }
];

export default function WhyInvestSection() {
  const [expandedItem, setExpandedItem] = useState<number>(1); // First item open by default

  const toggleItem = (id: number) => {
    setExpandedItem(id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display-fair text-4xl md:text-5xl mb-12">Why Invest in Nigeria Real Estate</h2>
            <div className="space-y-6 md:pl-4">
              {investmentReasons.map((reason) => (
                <div
                  key={reason.id}
                  className={`border-l-2 pl-6 transition-all duration-300 ${expandedItem === reason.id ? 'border-green-600' : 'border-gray-200'}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm transition-colors duration-300 ${expandedItem === reason.id ? 'bg-green-600' : 'bg-gray-400'}`}
                    >
                      {reason.id}
                    </div>
                    <button
                      onClick={() => toggleItem(reason.id)}
                      className="w-full text-left group"
                    >
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${expandedItem === reason.id ? 'text-green-700' : 'text-gray-800'} group-hover:text-green-700`}>
                        {reason.title}
                      </h3>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedItem === reason.id ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 mb-2">{reason.description}</p>
                      <div className="text-gray-700 mt-2">{reason.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[650px] overflow-hidden">
            <Image
              src="/welcome2.jpg"
              alt="Nigeria Landmark"
              fill
              className="object-cover bg-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
