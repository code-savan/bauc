import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className=''>
            <Image src={"/logo-dark.png"} alt='logo dark' width={200} height={200} />
          <div className='flex items-center space-x-3 cursor-pointer'>
            <Image src={"/facebook.png"} alt='logo dark' width={25} height={25} />
            <Image src={"/instagram.png"} alt='logo dark' width={25} height={25} />
          </div>
          </div>

             {/* Services */}
             <div>
            <h3 className="text-xl font-bold mb-2">United kingdom:
            </h3>
            <ul className="space-y-2 mb-4">
              <li>128 City Road, London, EC1V 2NX
              </li>
              <li>M: +44 7840 782759
              </li>
            </ul>
            <h3 className="text-xl font-bold mb-2">United States of America:
            </h3>
            <ul className="space-y-2 mb-4">
              <li>Suite 500, 123 17 Bellaire Boulevard,
              </li>
              <li>Houston, Texas 77072
              </li>
              <li>M: +13464048455</li>
            </ul>
            <h3 className="text-xl font-bold mb-2">Nigeria:
            </h3>
            <ul className="space-y-2 mb-4">
              <li>Kingfem GA247 Plot 264 Ahmadu Bello Express Way,
              </li>
              <li>Mabushi-Wuse 2, Abuja, FCT
              </li>
              <li>M: +2348035933363
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-green-400">Home</Link></li>
              <li><Link href="/vetted-properties" className="hover:text-green-400">Vetted Properties</Link></li>
              <li><Link href="/developers" className="hover:text-green-400">Developers</Link></li>
              <li><Link href="/blog" className="hover:text-green-400">Blog</Link></li>
              <li><Link href="/events" className="hover:text-green-400">Events</Link></li>
              <li><Link href="/events" className="hover:text-green-400">Expression of Interest</Link></li>
              <li><Link href="/events" className="hover:text-green-400">Contact Us</Link></li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-4 py-2 rounded bg-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded font-mono uppercase"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center flex justify-between items-center">
          <p>&copy; 2024 – BAUC INTERNATIONAL. <span className='text-gray-500'> All Rights Reserved.</span></p>

          <p className='text-gray-500'>Vetting Real Estate In Africa

</p>
        </div>
      </div>
    </footer>
  );
}
