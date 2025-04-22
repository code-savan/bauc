'use client';

import Image from 'next/image';
import { useState } from 'react';

type JourneyStep = {
  step: number;
  title: string;
  subtitle: string;
  points: {
    title: string;
    description: string;
  }[];
  imageSrc: string;
};

const journeySteps: JourneyStep[] = [
  {
    step: 1,
    title: 'Property Vetting & Investment Consultation',
    subtitle: '',
    points: [
      {
        title: 'Book a Consultation',
        description: 'Schedule a session with our expert real estate team.'
      },
      {
        title: 'Assess Your Investment Goals',
        description: 'We analyze your property investment needs, risk appetite, and long-term objectives.'
      },
      {
        title: 'Vetted Property Recommendations',
        description: 'We present only thoroughly vetted and credible real estate opportunities.'
      },
      {
        title: 'Due Diligence & Risk Analysis',
        description: 'We evaluate each property\'s legitimacy, potential risks, and expected ROI.'
      },
      {
        title: 'Financial Planning Support',
        description: 'We help you explore financing options and cost-effective investment strategies.'
      }
    ],
    imageSrc: '/vetted.jpg'
  },
  {
    step: 2,
    title: 'Securing & Managing Your Property Investment',
    subtitle: '',
    points: [
      {
        title: 'Property Acquisition Support',
        description: 'We guide you through the booking process with verified developers.'
      },
      {
        title: 'Legal & Documentation Checks',
        description: 'Our legal team ensures that all contracts and property documents are legitimate and secure.'
      },
      {
        title: 'Ownership Verification & Approval',
        description: 'We facilitate cross-checking and authentication of all paperwork before finalizing the purchase.'
      },
      {
        title: 'Portfolio Supervision',
        description: 'Need ongoing support? We oversee rentals, leasing, and property management to protect your investment.'
      }
    ],
    imageSrc: '/prop.jpg'
  },
  {
    step: 3,
    title: 'Portfolio Growth & Exit Strategies',
    subtitle: '',
    points: [
      {
        title: 'Market Intelligence Reports',
        description: 'We provide regular updates on Nigeria\'s real estate trends and investment climate.'
      },
      {
        title: 'Strategic Investment Advisory',
        description: 'Our experts help you optimize returns and adjust your portfolio as needed.'
      },
      {
        title: 'Profitable Exit Strategies',
        description: 'When you\'re ready to sell or reinvest, we ensure a smooth and lucrative transition.'
      }
    ],
    imageSrc: '/developers.jpg'
  }
];

// Function to get step color based on step number
const getStepColor = (step: number) => {
  switch(step) {
    case 1:
      return {
        bg: 'bg-gradient-to-br from-green-500 to-green-700',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
        badge: 'bg-green-600'
      };
    case 2:
      return {
        bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600',
        badge: 'bg-emerald-600'
      };
    case 3:
      return {
        bg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
        iconBg: 'bg-teal-100',
        iconText: 'text-teal-600',
        badge: 'bg-teal-600'
      };
    default:
      return {
        bg: 'bg-gradient-to-br from-green-500 to-green-700',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
        badge: 'bg-green-600'
      };
  }
};

export default function InvestmentJourney() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const handleImageLoad = (step: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [step]: true
    }));
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display-fair text-center mb-16 uppercase">
          Your Investment Journey with <br /> BAUC International
        </h2>

        <div className="space-y-32">
          {journeySteps.map((step) => {
            const colorScheme = getStepColor(step.step);

            return (
              <div key={step.step} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Step information - switches sides based on odd/even */}
                <div className={`order-2 ${step.step % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex flex-col space-y-8">
                    <div className="flex items-center">
                      <div className={`
                        relative z-10 w-20 h-20 flex items-center justify-center text-white font-bold rounded-xl shadow-lg
                        ${colorScheme.bg}
                      `}>
                        <span className="text-2xl">{step.step}</span>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-xl text-gray-500 font-light">{step.subtitle}</p>
                      </div>
                    </div>

                    <ul className="space-y-5 mt-3 pl-3">
                      {step.points.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className={`
                            min-w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0
                            ${colorScheme.iconBg} ${colorScheme.iconText}
                          `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{point.title}</span>
                            <p className="text-gray-600 mt-1">{point.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image - switches sides based on odd/even */}
                <div className={`order-1 ${step.step % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative h-[450px] overflow-hidden rounded-xl shadow-xl">
                    {/* Skeleton loader */}
                    {!imagesLoaded[step.step] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <Image
                      src={step.imageSrc}
                      alt={`Step ${step.step}: ${step.title}`}
                      fill
                      className={`object-cover transition-opacity duration-500 ${imagesLoaded[step.step] ? 'opacity-100' : 'opacity-0'}`}
                      priority={step.step === 1}
                      onLoad={() => handleImageLoad(step.step)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className={`
                        px-3 py-1 rounded-full text-sm font-medium inline-block mb-2
                        ${colorScheme.badge}
                      `}>
                        Step {step.step}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
