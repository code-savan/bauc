import Services from '../components/Services';
import TeamCarousel from '../components/TeamCarousel';
import WhyInvestSection from '../components/WhyInvestSection';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main>
      {/* Modern Hero Banner with Centered Content */}
      <section className="relative md:h-[600px] h-[480px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="BAUC International"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-7xl font-bold text-white mb-2 md:mb-1 tracking-tight">
              <span className="text-white opacity-90">About</span>{" "}
              <span className="text-green-400">BAUC</span>
            </h1>

            <div className="w-16 md:w-24 h-0.5 bg-green-400/60 mx-auto mb-1 md:mb-3"></div>

            <p className="text-base md:text-xl font-medium text-white/80 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto">
              Your trusted partner in Nigerian real estate investment
            </p>

            {/* Stats with Icons - More Compact */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 max-w-lg mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1.5 md:mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white mb-0.5">15</span>
                <span className="text-white/70 uppercase tracking-wider text-[10px] md:text-xs">Years Experience</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1.5 md:mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white mb-0.5">500+</span>
                <span className="text-white/70 uppercase tracking-wider text-[10px] md:text-xs">Properties Vetted</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1.5 md:mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white mb-0.5">1000+</span>
                <span className="text-white/70 uppercase tracking-wider text-[10px] md:text-xs">Happy Clients</span>
              </div>
            </div>

            {/* CTA Button - More Refined */}
            <div className="mt-6 md:mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 md:gap-2 bg-green-500/90 hover:bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all transform hover:scale-105"
              >
                Start Your Investment Journey
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Refined */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-tight">
              Connecting diaspora investors with <span className="text-green-600">credible</span> and <span className="text-green-600">trustworthy</span> real estate opportunities
            </h2>
            <div className="w-16 h-0.5 bg-green-400/60 mx-auto mb-6"></div>
            <p className="text-base text-gray-600 leading-relaxed">
              BAUC INTERNATIONAL is a London-based real estate vetting company committed to ensuring that diaspora investors connect with only credible and trustworthy real estate developers in Nigeria. We provide detailed and unbiased information to help you make informed investment decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats & Info in Modern Cards */}
      <section className="py-8 md:py-16 bg-gray-50/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* Years of Excellence */}
            <div className="bg-white p-5 md:p-8 rounded-lg hover:shadow-sm transition-shadow duration-300">
              <div className="flex items-start md:items-center mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center mr-3 md:mr-4 mt-1 md:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-2xl font-serif">
                  <span className="text-green-600 font-medium">15 Years</span> of Excellence
                </h3>
              </div>
              <div className="pl-11 md:pl-16">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  For over 15 years, we have successfully helped clients navigate the complexities of real estate investment, ensuring they achieve their property portfolio goals seamlessly.
                </p>
              </div>
            </div>

            {/* Tailored Investment Solutions */}
            <div className="bg-white p-5 md:p-8 rounded-lg hover:shadow-sm transition-shadow duration-300">
              <div className="flex items-start md:items-center mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center mr-3 md:mr-4 mt-1 md:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-2xl font-serif">
                  Tailored <span className="text-green-600 font-medium">Investment</span> Solutions
                </h3>
              </div>
              <div className="pl-11 md:pl-16">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  We work closely with each client, understanding their unique investment objectives and matching them with the right real estate opportunities that align with their goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Modern Design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3">A One-Stop Solution for Property Investment</h2>
            <div className="w-16 h-0.5 bg-green-400/60 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-green-600/90 text-center font-light mb-10">
              We provide end-to-end real estate investment services, including:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Property Portfolio Vetting</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Ensuring your investment is safe and profitable through our rigorous vetting process.</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Investment Advisory & Decision Support</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Helping you make smart, risk-free choices based on market data and expertise.</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Funds Transfer & Portfolio Financing</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Assisting in seamless financial transactions with secure and efficient processes.</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Property Supervision & Management</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Overseeing your investment for long-term success with professional management services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Refined */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white font-medium mb-4">Start Your Investment Journey Today!</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-white/90">
            With BAUC INTERNATIONAL, investing in Nigeria&apos;s real estate market is hassle-free and rewarding. Let us guide you towards securing a profitable and stress-free investment.
          </p>
          <a href="/contact" className="inline-block bg-white/95 hover:bg-white text-green-600 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
            Contact Us Now
          </a>
        </div>
      </section>

      {/* Include Other Sections */}
      <Services />
      <WhyInvestSection />
      <TeamCarousel />
    </main>
  );
}
