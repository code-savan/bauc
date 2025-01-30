import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-black py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center justify-between w-[75%] mx-auto">
            <a href="tel:+447840782759" className="text-white hover:text-white/80">
            +447840782759
            </a>
            <a href="tel:+2348113822048" className="text-white hover:text-white/80">
            +2348113822048
            </a>
            <a href="mailto:vet@baucinternational.com" className="text-white hover:text-white/80">
            vet@baucinternational.com
            </a>

          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {/* <span className="text-2xl font-bold text-green-600">BAUC International</span> */}
            <Image src={"/logo.png"} alt='logo' width={200} height={200} />
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-green-600">Home</Link>
            <Link href="/vetted-properties" className="text-gray-600 hover:text-green-600">Vetted Properties</Link>
            <Link href="/developers" className="text-gray-600 hover:text-green-600">Developers</Link>
            <Link href="/blog" className="text-gray-600 hover:text-green-600">Blog</Link>
            <Link href="/events" className="text-gray-600 hover:text-green-600">Events</Link>
            <Link href="/expats-citizens" className="text-gray-600 hover:text-green-600">Expression of Intrest</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
