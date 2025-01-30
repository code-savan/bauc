

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Service {
  image: string;
  title: string;
  content: string;
}

const services: Service[] = [
  {
    image: '/1.jpg',
    title: 'Real Estate Portfolio Vetting',
    content: 'Our designated experienced legal team take their time to scrutinize every real estate portfolio in Nigeria listed on our directory for authenticity before recommending them for client consumption. You will be sure to get unbiased, up to date detailed information about any real estate portfolio investment in Nigeria. Based on the detailed information provided, our client is certain to make the right and most profitable real estate investment. Also, because of the high risk associated with the real estate portfolio investment in Nigeria, you are sure of a safe investment portfolio through BAUC International.'
  },
  {
    image: '/2.jpg',
    title: 'Property Portfolio Search',
    content: 'Do you have specific real estate needs or a specific location that you want your property portfolio investment in? <br /><br /> No matter what your real estate investment need is, you can count on our unbiased professional and client-oriented real estate investment advisory service. We don’t cut corners! We only recommend property investment that has been thoroughly vetted by our legal team.'
  },
  {
    image: '/3.jpg',
    title: 'Supervision, Development & Management of Real Estate Portfolio',
    content: 'We help source for high reputable engineers, vendors, suppliers and developers for that your building projects, therefore you don’t need to worry about owning that dream home or property investment portfolio. We ensure that all construction best practice and guidelines are followed by the developers and quality materials are used for your projects.'
  },
  {
    image: '/4.webp',
    title: 'Real Estate Advisory Back Home',
    content: `Are you looking to invest back home in Nigeria but can’t trust your funds with a relative or family member? or are you compelled by financial returns and looking to add real estate investment portfolio?
<br />
We understand the complexity and common risk associated with real estate investment in Nigeria and Africa, however we are here to make it hassle free for you.
<br />
We only partner with real estate developers that are genuine and credible in the industry with track records of stewardship and professionalism. Our aim is to ensure your real estate investment is safe with the right investment profile that meet your portfolio investment plan.

`
  },
  {
    image: '/5.jpg',
    title: 'Real Estate Portfolio Management',
    content: 'No need to worry about the supervision, development and management of your real estate portfolio.  We work closely with our legal and property management team oversee your investment in-country. We also furnish our client with a market value of their portfolio investment and advise accordingly.'
  },
  {
    image: '/6.jpg',
    title: 'Real Estate Exhibition in Diaspora',
    content: 'No need to travel back home in search of different real estate options, We bring properly vetted real estate developers to your doorstep. This avails you to exception investment deals and an opportunity to meet first hand with the top senior executives of the property companies.'
  },
  {
    image: '/7.jpg',
    title: 'Mortgage/Financial Partner',
    content: 'We are committed to meeting the property investment needs of different clientele strata, whether it is for off plan project or you want a bespoke instalment payment plan or possibly you want a mortgage/financial partner to fund your property investment, we have got you covered as our well experienced real estate team will definitely point you in the right direction.'
  },

];

const Services = () => {
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
         <div className="container mx-auto">
         <h2 className="font-display-fair text-[20px] md:text-5xl text-center mb-16 font-bold md:font-normal">HOW WE HELP OUR CLIENT ACHIEVE THEIR REAL ESTATE INVESTMENT NEEDS</h2>
           <div className="relative">

             <div
               ref={containerRef}
               className="flex gap-8 overflow-x-hidden scroll-smooth px-4 "
             >
               {services.map((service, index) => (
                 <div
                   key={index}
                   className="flex-none w-[320px] md:w-[550px] group "
                 >
                   <div className="relative h-80 w-[320px] md:w-[550px] mb-4 overflow-hidden ">
                     <Image
                       src={service.image}
                       alt={service.image}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                   </div>
                   <h3 className="text-[17px] font-semibold mb-1">{service.title}</h3>
                   <p className="text-gray-600 text-[12px]" dangerouslySetInnerHTML={{__html: service.content}}></p>
                   {/* <button className="mt-4 font-space-mono text-sm text-green-600 hover:text-green-700 transition-colors">
                     VIEW PROFILE
                   </button> */}
                 </div>
               ))}
             </div>

           </div>
           <div className=' w-fit flex space-x-3 float-right pt-3'>
           <button
               onClick={() => scroll('left')}
               className=" bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <button
               onClick={() => scroll('right')}
               className=" bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
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
