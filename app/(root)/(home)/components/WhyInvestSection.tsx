import Image from 'next/image';

export default function WhyInvestSection() {
  return (
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
  );
}
