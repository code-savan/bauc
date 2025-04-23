'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
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
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
            Secure Your Real Estate Investment<br />
            in Nigeria with Confidence!
          </h1>
          <div className="bg-green-600 text-white py-3 px-10 inline-block transform -skew-x-12 text-lg font-medium mb-0 relative">
            <span className="inline-block transform skew-x-12">Worried about Investing in Nigeria?</span>
          </div>
        </motion.div>

        {/* Explanatory Text */}
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto space-y-6 text-lg text-center mb-12">
          <p className="font-medium text-gray-800">
            Do you dream of owning property in Nigeria but hesitate to <span className="font-bold">trust</span> your <span className="font-bold">funds</span> with <span className="font-bold">relatives</span>, <span className="font-bold">friends</span>, or <span className="font-bold">family members</span>
          </p>
          <p className="font-medium text-gray-800">
            Struggling to find a <span className="font-bold">reliable</span>, <span className="font-bold">credible</span>, and <span className="font-bold">trustworthy</span> developer for your <span className="font-bold">real estate</span> investment?
          </p>
          <p className="text-gray-700">
            At BAUC INTERNATIONAL, we take the guesswork out of property investments. We thoroughly vet real estate portfolios, ensuring your hard-earned money is invested wisely and securely.
          </p>
        </motion.div>

        {/* Feature Grid - Using bordered boxes instead of images */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Feature 1 */}
          <div className="group border border-gray-200 rounded-none p-8 hover:border-green-500 transition-colors duration-300 hover:shadow-sm">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-800">In-depth due diligence</h3>
              </div>
              <p className="text-gray-600 mt-2">
                We conduct thorough investigations and analysis of real estate opportunities to protect your investment from potential risks and ensure maximum returns.
              </p>
              <div className="mt-auto pt-4">
                <div className="w-16 h-1 bg-green-600 rounded-none"></div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border border-gray-200 rounded-none p-8 hover:border-green-500 transition-colors duration-300 hover:shadow-sm">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Transparent property insights</h3>
              </div>
              <p className="text-gray-600 mt-2">
                We provide clear, unbiased information about property markets, trends, and opportunities, enabling you to make informed investment decisions.
              </p>
              <div className="mt-auto pt-4">
                <div className="w-16 h-1 bg-gray-800 rounded-none"></div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group border border-gray-200 rounded-none p-8 hover:border-green-500 transition-colors duration-300 hover:shadow-sm">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Access to reputable developers</h3>
              </div>
              <p className="text-gray-600 mt-2">
                We connect you directly with Nigeria&apos;s most reliable and proven real estate developers, eliminating the need to rely on uncertain intermediaries.
              </p>
              <div className="mt-auto pt-4">
                <div className="w-16 h-1 bg-gray-800 rounded-none"></div>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group border border-gray-200 rounded-none p-8 hover:border-green-500 transition-colors duration-300 hover:shadow-sm">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-sm">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Peace of mind guarantee</h3>
              </div>
              <p className="text-gray-600 mt-2">
                Our experienced team handles every aspect of your investment journey, providing expert oversight and management for complete peace of mind.
              </p>
              <div className="mt-auto pt-4">
                <div className="w-16 h-1 bg-green-600 rounded-none"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
