'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Service {
  image: string;
  title: string;
  content: string;
}

const services: Service[] = [
  {
    image: '/1.webp',
    title: 'PORTFOLIO VETTING',
    content: `Our vetting service ensures that real estate investments are credible and secure. We conduct a thorough portfolio search by applying to federal and state land registries to verify the authenticity of real estate portfolios. A physical portfolio inspection is carried out to confirm the availability of the property. <br /><br /> Additionally, we verify the developer's credentials, including registration with relevant authorities, project delivery history, business duration, litigation records, external partnerships, financial standing, and online presence. Risk assessment is also conducted to determine the accuracy of the developer's claims and evaluate the investment's risk level.`
  },
  {
    image: '/2.jpg',
    title: 'PORTFOLIO DEVELOPMENT MANAGEMENT',
    content: 'We provide expert portfolio development management, ensuring smooth execution from planning to completion. Our services include defining project goals, creating project plans with clear objectives, timelines, and budgets, and organizing teams to collaborate with relevant industries and authorities. We allocate financial and human resources efficiently while tracking project progress, measuring performance strategies, and making corrective adjustments as needed. <br /><br /> Quality assurance is a priority, ensuring projects meet predefined standards. We manage stakeholder engagement, oversee budget and cost control, and coordinate risk management, including vendor supervision, material procurement, and issue resolution. Upon project completion, we ensure all goals are met within the stipulated timeline.'
  },
  {
    image: '/3.jpg',
    title: 'PORTFOLIO SUPERVISION MANAGEMENT',
    content: 'Our portfolio supervision management services ensure daily real estate operations run efficiently. We oversee project and contractor supervision while ensuring compliance with legal and regulatory standards. Resource allocation is managed effectively, with financial services including budgeting and income-expenditure reporting. Quality control is maintained through maintenance supervision, tenant complaint management, and structural material oversight. We track project progress, implement corrective measures, and conduct risk assessments to ensure compliance with zoning laws and safety regulations. <br /><br /> Our team management strategies ensure seamless coordination, clear goal communication, and conflict resolution. We also facilitate stakeholder communication, ensuring transparency with developers and contractors. Budget monitoring is conducted to keep projects within financial limits, with necessary adjustments made when needed. Finally, we oversee project closure by achieving deliverables, obtaining approvals, finalizing contracts, and conducting post-project evaluations to assess outcomes.'
  },
  {
    image: '/4.png',
    title: 'LEGAL SERVICES',
    content: `Our legal services provide clients with expert consultation, case analysis, and strategic legal advice. We draft essential legal documents such as lease agreements, demand notices, and contract agreements. <br /><br /> We also handle litigation and court representation, including preparing necessary court documents, pleadings, motions, and settlement agreements, and representing clients in court proceedings. <br /><br /> Additionally, we offer alternative dispute resolution, assisting clients in negotiation, mediation, and arbitration proceedings to achieve favorable settlements outside of court.

`
  },
  {
    image: '/5.jpg',
    title: 'PORTFOLIO MANAGEMENT',
    content: 'Our portfolio management services cover a comprehensive range of real estate oversight. We authenticate the legitimacy of real estate portfolios, manage tenant screening and selection, and handle lease agreements, tenant relations, and dispute resolutions. <br /><br /> Financial management is also a key component, including rent collection and detailed financial reporting. Additionally, we coordinate regular property inspections, maintenance, and repairs while executing strategic marketing initiatives to promote vacant portfolio units.'
  },
  {
      image: '/7.jpg',
      title: 'PORTFOLIO INVESTMENT',
      content: 'We guide clients through portfolio investment by offering expert consultation and vetting services. Our team ensures that vetted properties align with clients\' investment goals, verifying property availability and expected completion dates. <br /><br /> We provide flexible payment plans and confirm that payment terms adhere to the specific property type, ensuring a seamless investment process.'
    },
      {
        image: '/6.jpg',
        title: 'MORTGAGE AND FINANCIAL PARTNERSHIPS',
        content: 'We cater to a diverse range of clients with varying investment needs. Whether you\'re looking to fund an off-plan project, require a bespoke installment payment plan, or need a mortgage or financial partner, BAUC International has you covered. Our experienced real estate team is here to guide you toward the best financial solutions for your property investments.'
      },

];

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update items per slide based on screen size
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setItemsPerSlide(2);
        } else {
          setItemsPerSlide(1);
        }
      };

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
      if (containerRef.current) {
        const slideWidth = containerRef.current.clientWidth;
        const scrollAmount = direction === 'left' ? -slideWidth : slideWidth;
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        // Update current index
        if (direction === 'left' && currentIndex > 0) {
          setCurrentIndex(currentIndex - itemsPerSlide);
        } else if (direction === 'right' && currentIndex < services.length - itemsPerSlide) {
          setCurrentIndex(currentIndex + itemsPerSlide);
        }
      }
    };

  return (
   <section className="py-20 bg-gray-50">
         <div className="container mx-auto">
         <h2 className="font-display-fair text-[20px] md:text-5xl text-center mb-16 font-bold md:font-normal">HOW WE HELP OUR CLIENT ACHIEVE THEIR REAL ESTATE INVESTMENT NEEDS</h2>
           <div className="relative">
             <div
               ref={containerRef}
               className="flex gap-8 overflow-x-hidden scroll-smooth px-4"
             >
               {services.map((service, index) => (
                 <div
                   key={index}
                   className="flex-none w-full md:w-[calc(50%-16px)] group relative"
                 >
                   <div className="relative h-80 w-full mb-4 overflow-hidden">
                     <Image
                       src={service.image}
                       alt={service.image}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                   </div>
                   <h3 className="text-[17px] font-semibold mb-1">{service.title}</h3>
                   <p className="text-gray-600 text-[12px]" dangerouslySetInnerHTML={{__html: service.content}}></p>
                 </div>
               ))}
             </div>

             {/* Navigation arrows - positioned differently on mobile vs desktop */}
             <div className="md:hidden absolute bottom-[calc(100%-300px)] right-8 flex space-x-2 z-10">
               <button
                 onClick={() => scroll('left')}
                 className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                 disabled={currentIndex === 0}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button
                 onClick={() => scroll('right')}
                 className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                 disabled={currentIndex >= services.length - itemsPerSlide}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
             </div>
           </div>

           {/* Desktop navigation arrows - shown only on md screens and above */}
           <div className='hidden md:flex w-fit space-x-3 float-right pt-3'>
             <button
               onClick={() => scroll('left')}
               className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
               disabled={currentIndex === 0}
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <button
               onClick={() => scroll('right')}
               className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
               disabled={currentIndex >= services.length - itemsPerSlide}
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </div>
         </div>
       </section>
  )
}

export default Services
