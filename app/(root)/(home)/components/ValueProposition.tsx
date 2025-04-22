'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ValueProposition() {
  return (
    <section className="py-16 bg-white">
      <motion.div
        className="container mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Secure Your Real Estate Investment<br />
            in Nigeria with Confidence!
          </h1>
          <div className="bg-green-600 text-white py-3 px-6 inline-block rounded-full text-lg font-medium mb-8">
            Worried about Investing in Nigeria?
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto space-y-6 text-lg text-center mb-12"
        >
          <p className="font-medium text-gray-800">
            Do you dream of owning property in Nigeria but hesitate to TRUST your FUNDS with RELATIVES, FRIENDS, or FAMILY MEMBERS
          </p>
          <p className="font-medium text-gray-800">
            Struggling to find a RELIABLE, CREDIBLE, and TRUSTWORTHY developer for your REAL ESTATE investment?
          </p>
          <p className="text-gray-600">
            At BAUC INTERNATIONAL, we take the guesswork out of property investments. We thoroughly vet real estate portfolios, ensuring your hard-earned money is invested wisely and securely.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              image: '/1.webp',
              title: 'In-depth due diligence to protect your investment',
              number: '1'
            },
            {
              image: '/2.jpg',
              title: 'Transparent and unbiased property insights',
              number: '2'
            },
            {
              image: '/3.jpg',
              title: 'Direct access to the most reputable developers',
              number: '3'
            },
            {
              image: '/4.png',
              title: 'Peace of mind knowing your investment is in expert hands',
              number: '4'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="relative h-[300px] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      {item.number}
                    </div>
                    <h3 className="text-white text-xl font-medium">{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
