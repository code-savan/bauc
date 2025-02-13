import Image from 'next/image';

export default function CertificationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="md:max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-100 text-green-800 font-space-mono px-6 py-2 rounded-full mb-8">
            Vetted & Trusted
          </div>
          <div className='md:flex w-full md:items-start text-left justify-between leading-snug'>
            <div>
              <p className="text-xl md:text-[17px] text-gray-700 mb-12 font-inter md:w-[70%]">
                We vet real estate portfolios in Nigeria and help you get value for every penny invested in the property portfolio. <br /> <br />
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
  );
}
