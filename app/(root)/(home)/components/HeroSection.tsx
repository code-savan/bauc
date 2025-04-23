'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-[42px] md:text-7xl text-white mb-4 leading-tight tracking-tight"
          >
            Discover your <br className='hidden md:block' />
            dream home today
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-20 h-0.5 bg-white/30 mb-6 hidden md:block origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-xl"
          >
            Your trusted partner in Nigerian real estate investment, ensuring credible and secure property acquisitions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/vetted-properties" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 w-full sm:w-auto"
              >
                Get started
              </motion.button>
            </Link>
            <Link href="https://calendly.com/vet-baucinternational/60min" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="md:bg-transparent bg-white/20 text-white border border-white md:border-white/30 px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 w-full sm:w-auto"
              >
                Get consultation
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="col-span-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  ].map((src, index) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                      className="w-8 h-8 rounded-full border-2 border-white relative overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
                className="text-white/80 text-sm"
              >
                5000+ People have choosen our residential complex as their home
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
