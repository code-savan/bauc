import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px]" id="#">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Luxury Real Estate"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[42px] md:text-7xl text-white mb-4 leading-tight tracking-tight">
            Discover your <br className='hidden md:block' />
            dream home today
          </h1>
          <div className="w-20 h-0.5 bg-white/30 mb-6 hidden md:block" />
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-xl">
            Your trusted partner in Nigerian real estate investment, ensuring credible and secure property acquisitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/properties" className="inline-block">
              <button className="bg-white hover:bg-white/95 text-gray-900 px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 w-full sm:w-auto">
                Get started
              </button>
            </Link>
            <Link href="/contact" className="inline-block">
              <button className="md:bg-transparent bg-white/20 hover:bg-white/10 text-white border border-white md:border-white/30 px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 w-full sm:w-auto">
                Get consultation
              </button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
            <div>
              <div className="flex items-center gap-1 text-white mb-1">
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-medium">(4.9)</span> assessment
                <div className="text-white/60">(150+) reviews</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                5000+ People have choosen our residential complex as their home
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
