'use client';

import Image from 'next/image';

interface Service {
  title: string;
  content: string;
  bulletPoints: string[];
  image: string;
  icon: JSX.Element;
}

// Create a custom bullet point icon component
const ServiceBulletIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'vetting':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      );
    case 'legal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      );
    case 'investment':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      );
    case 'management':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
        </svg>
      );
    case 'supervision':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      );
    case 'mortgage':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
  }
};

const services: Record<string, Service> = {
  portfolioVetting: {
    title: 'Portfolio Vetting',
    content: 'At BAUC INTERNATIONAL, we ensure your real estate investments are secure and credible. Our rigorous vetting process includes:',
    bulletPoints: [
      'Verification of property authenticity through federal and state land registries.',
      'Physical inspection to confirm property availability.',
      'Developer credential checks, including registration, project history, financial standing, and litigation records.',
      'Comprehensive risk assessment to evaluate investment viability.'
    ],
    image: '/1.webp',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    )
  },
  portfolioDevelopment: {
    title: 'Portfolio Development Management',
    content: 'We oversee your portfolio development from start to finish, ensuring efficiency and quality through:',
    bulletPoints: [
      'Goal setting, project planning, and budgeting.',
      'Team coordination and resource allocation',
      'Progress tracking, quality assurance, and risk management.',
      'Stakeholder engagement, cost control, and final project evaluation.'
    ],
    image: '/2.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    )
  },
  legalServices: {
    title: 'Legal Services',
    content: 'Our legal team provides expert guidance and representation, including:',
    bulletPoints: [
      'Drafting lease agreements, demand notices, and contracts.',
      'Handling litigation, court representation, and dispute resolution.',
      'Supporting alternative dispute resolution via negotiation, mediation, and arbitration'
    ],
    image: '/4.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
      </svg>
    )
  },
  portfolioInvestment: {
    title: 'Portfolio Investment',
    content: 'We guide clients through strategic real estate investments by:',
    bulletPoints: [
      'Vetting properties to align with investment goals.',
      'Confirming property availability and completion',
      'Providing flexible payment plans and secure transaction verification.'
    ],
    image: '/7.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    )
  },
  portfolioManagement: {
    title: 'Portfolio Management',
    content: 'We offer comprehensive real estate oversight, including',
    bulletPoints: [
      'Tenant screening, lease management, and dispute resolution.',
      'Financial services such as rent collection and reporting.',
      'Property maintenance, inspections, and strategic marketing for vacancies.'
    ],
    image: '/5.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  portfolioSupervision: {
    title: 'Portfolio Supervision Management',
    content: 'We ensure smooth daily operations of your real estate portfolio by:',
    bulletPoints: [
      'Overseeing project execution, contractor supervision, and compliance.',
      'Managing financial reports, budgeting, and quality control.',
      'Tracking project progress, mitigating risks, and stakeholder communication.',
      'Ensuring successful project completion with final evaluations and approvals.'
    ],
    image: '/3.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    )
  },
  mortgageFinancial: {
    title: 'Mortgage & Financial Partnership Support',
    content: 'Looking for flexible financing options? We assist with:',
    bulletPoints: [
      'Off-plan projects and installment plans',
      'Securing reliable mortgage and financial partnerships.',
      'Expert financial guidance tailored to your investment needs.'
    ],
    image: '/6.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    )
  }
};

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-display-fair text-[20px] md:text-5xl text-center mb-16 font-bold md:font-normal">
          HOW WE HELP OUR CLIENT ACHIEVE THEIR REAL ESTATE INVESTMENT NEEDS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Row 1 - First Three Cards */}
          {/* Portfolio Vetting - Featured Card with Image Background */}
          <div className="md:col-span-4 h-[420px] md:h-[450px] relative group overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={services.portfolioVetting.image}
                alt={services.portfolioVetting.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-900/90 to-green-900/80"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col text-white z-10">
              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center mb-4">
                <div className="text-white">
                  {services.portfolioVetting.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white drop-shadow-sm">{services.portfolioVetting.title}</h3>
              <p className="text-white mb-4 text-sm font-medium drop-shadow-sm">{services.portfolioVetting.content}</p>
              <ul className="space-y-1">
                {services.portfolioVetting.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-300 inline-block mt-1">
                      <ServiceBulletIcon type="vetting" />
                    </span>
                    <span className="text-white font-medium drop-shadow-sm inline-block">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Portfolio Development - Card with White Background and Green Border Bottom */}
          <div className="md:col-span-4 h-[420px] md:h-[450px] bg-white p-8 flex flex-col hover:shadow-lg hover:scale-[1.01] transition-all duration-500 hover:z-10 border-b-4 border-green-600">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <div className="text-green-600">
                {services.portfolioDevelopment.icon}
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{services.portfolioDevelopment.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{services.portfolioDevelopment.content}</p>
            <ul className="space-y-1">
              {services.portfolioDevelopment.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 inline-block mt-1">
                    <ServiceBulletIcon type="development" />
                  </span>
                  <span className="text-gray-700 inline-block">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services - Card with Image Background and Overlay */}
          <div className="md:col-span-4 h-[420px] md:h-[450px] relative group overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={services.legalServices.image}
                alt={services.legalServices.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/90 to-green-900/85"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col text-white z-10">
              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center mb-4">
                <div className="text-white">
                  {services.legalServices.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white drop-shadow-sm">{services.legalServices.title}</h3>
              <p className="text-white mb-4 text-sm font-medium drop-shadow-sm">{services.legalServices.content}</p>
              <ul className="space-y-1">
                {services.legalServices.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-300 inline-block mt-1">
                      <ServiceBulletIcon type="legal" />
                    </span>
                    <span className="text-white font-medium drop-shadow-sm inline-block">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          {/* Portfolio Investment - Card with Subtle Border */}
          <div className="md:col-span-4 h-[380px] bg-white p-8 flex flex-col border-t-4 border-green-600 hover:shadow-lg hover:scale-[1.01] transition-all duration-500 hover:z-10">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <div className="text-green-600">
                {services.portfolioInvestment.icon}
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{services.portfolioInvestment.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{services.portfolioInvestment.content}</p>
            <ul className="space-y-1">
              {services.portfolioInvestment.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 inline-block mt-1">
                    <ServiceBulletIcon type="investment" />
                  </span>
                  <span className="text-gray-700 inline-block">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio Management - Large Card with Image Background */}
          <div className="md:col-span-8 h-[380px] relative group overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={services.portfolioManagement.image}
                alt={services.portfolioManagement.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent"></div>
            </div>
            <div className="absolute inset-0 p-8 md:max-w-[60%] flex flex-col text-white z-10">
              <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-4">
                <div className="text-white">
                  {services.portfolioManagement.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white drop-shadow-sm">{services.portfolioManagement.title}</h3>
              <p className="text-white mb-4 text-sm font-medium drop-shadow-sm">{services.portfolioManagement.content}</p>
              <ul className="space-y-1">
                {services.portfolioManagement.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-300 inline-block mt-1">
                      <ServiceBulletIcon type="management" />
                    </span>
                    <span className="text-white font-medium drop-shadow-sm inline-block">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 3 */}
          {/* Portfolio Supervision - Full Width Content Aligned Left */}
          <div className="md:col-span-8 h-[380px] relative group overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={services.portfolioSupervision.image}
                alt={services.portfolioSupervision.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/60"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col text-white z-10">
              <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-4">
                <div className="text-white">
                  {services.portfolioSupervision.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white drop-shadow-sm">{services.portfolioSupervision.title}</h3>
              <p className="text-white mb-4 text-sm font-medium drop-shadow-sm">{services.portfolioSupervision.content}</p>
              <ul className="space-y-1">
                {services.portfolioSupervision.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-300 inline-block mt-1">
                      <ServiceBulletIcon type="supervision" />
                    </span>
                    <span className="text-white font-medium drop-shadow-sm inline-block">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mortgage & Financial - Card with Glass Effect */}
          <div className="md:col-span-4 h-[380px] relative group overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={services.mortgageFinancial.image}
                alt={services.mortgageFinancial.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/90 to-green-900/80 backdrop-blur-sm"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col text-white z-10">
              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center mb-4">
                <div className="text-white">
                  {services.mortgageFinancial.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white drop-shadow-sm">{services.mortgageFinancial.title}</h3>
              <p className="text-white mb-4 text-sm font-medium drop-shadow-sm">{services.mortgageFinancial.content}</p>
              <ul className="space-y-1">
                {services.mortgageFinancial.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-300 inline-block mt-1">
                      <ServiceBulletIcon type="mortgage" />
                    </span>
                    <span className="text-white font-medium drop-shadow-sm inline-block">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
