import Image from 'next/image';
import Link from 'next/link';
import TeamCarousel from './components/TeamCarousel';
import Services from './components/Services';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px]" id='#'>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Modern Villa"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="font-display-fair text-5xl md:text-5xl text-white/90 mb-8 leading-tight">
            Do you want to invest in Nigeria but Can’t <strong>TRUST</strong>  your <strong>FUNDS</strong>  with <strong>RELATIVES</strong>, <strong>FRIENDS</strong>, or <strong>FAMILY MEMBERS</strong>?
            </h1>
            <p className="text-xl md:text-xl text-white/90 mb-6 font-inter">
            Are you worried about choosing the <strong>RIGHT</strong>, <strong>CREDIBLE AND TRUSTWORTHY</strong>   developer for your <strong>REAL ESTATE</strong> Investment in Nigeria?
            </p>
            <button className="font-inter bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 transform leading-tight ">
              Get in Touch Now
            </button>
          </div>
        </div>
      </section>

      {/* Certification Badge Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="md:max-w-4xl mx-auto text-center">
            <div className="inline-block bg-green-100 text-green-800 font-space-mono px-6 py-2 rounded-full mb-8">
              Vetted & Trusted
            </div>
            <div className='md:flex  w-full md:items-start text-left justify-between leading-snug'>
            <div>
            <p className="text-xl md:text-[17px] text-gray-700 mb-12 font-inter md:w-[70%]">
            We vet real estate portfolios in Nigeria and help you get value for every penny invested in the property portfolio. <br />  <br />
            We help you conduct all due diligence and offer unbiased and detailed information about property portfolio in Nigeria.
            </p>
            <button className="font-space-mono bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 transform w-full md:w-fit">
              Book a Free Consultation Now
            </button>
            </div>

            <Image src={"/vetted.png"} alt='vetted' width={200} height={200} className='mx-auto mt-12 md:mt-0 w-[200px] h-[200px]' />

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display-fair text-4xl md:text-5xl text-center mb-16">HOW WE HELP OUR CLIENT ACHIEVE THEIR REAL ESTATE INVESTMENT NEEDS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Real Estate Portfolio Vetting',
                description: 'Ensuring vetted and legally secure investments',
              },
              {
                title: 'Property Portfolio Search',
                description: 'Finding the right properties in Nigeria',
              },
              {
                title: 'Supervision & Development',
                description: 'Handling real estate development projects',
              },
              {
                title: 'Mortgage/Financial Partner',
                description: 'Assisting with financial partnerships',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

         {/* Why Invest Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display-fair text-4xl md:text-5xl mb-8">Why Invest in Nigeria Real Estate</h2>
              <ul className="space-y-4">
                {[
                  'High Return on Investment (ROI)',
                  'Fast turnaround on investments',
                  'Growing demand in prime locations',
                  'Stable long-term appreciation',
                  'Emerging market opportunities',
                ].map((point, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/citygate.png"
                alt="Nigeria Landmark"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamCarousel />


    </main>
  );
}
