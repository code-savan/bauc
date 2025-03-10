import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
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
          <h1 className="font-display-fair text-3xl sm:text-4xl md:text-5xl text-white/90 mb-4 sm:mb-6 md:mb-8 leading-tight">
            Do you want to invest in Nigeria but Can&apos;t <strong>TRUST</strong> your <strong>FUNDS</strong> with <strong>RELATIVES</strong>, <strong>FRIENDS</strong>, or <strong>FAMILY MEMBERS</strong>?
          </h1>
          <p className="text-lg sm:text-xl md:text-xl text-white/90 mb-4 sm:mb-5 md:mb-6 font-inter">
            Are you worried about choosing the <strong>RIGHT</strong>, <strong>CREDIBLE AND TRUSTWORTHY</strong> developer for your <strong>REAL ESTATE</strong> Investment in Nigeria?
          </p>
          <Link href="/contact">
            <button className="font-inter bg-green-600 hover:bg-green-700 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-base sm:text-lg transition-all duration-300 hover:scale-105 transform leading-tight w-full sm:w-auto">
              Get in Touch Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
