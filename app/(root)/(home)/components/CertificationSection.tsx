import Image from 'next/image';
import Link from 'next/link';

export default function CertificationSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="md:max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-100 text-green-800 font-space-mono px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 text-sm sm:text-base">
            Vetted & Trusted
          </div>
          <div className='flex flex-col md:flex-row w-full md:items-start text-left justify-between leading-snug gap-8 md:gap-4'>
            <div>
              <p className="text-lg sm:text-xl md:text-[17px] text-gray-700 mb-8 sm:mb-10 md:mb-12 font-inter md:w-[70%]">
                We vet real estate portfolios in Nigeria and help you get value for every penny invested in the property portfolio. <br /> <br />
                We help you conduct all due diligence and offer unbiased and detailed information about property portfolio in Nigeria.
              </p>
              <Link href="/contact">
                <button className="font-space-mono bg-green-600 hover:bg-green-700 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 transform w-full md:w-fit text-base sm:text-lg">
                  Book a Free Consultation Now
                </button>
              </Link>
            </div>
            <Image
              src={"/vetted.png"}
              alt='vetted'
              width={200}
              height={200}
              className='mx-auto mt-8 md:mt-0 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
