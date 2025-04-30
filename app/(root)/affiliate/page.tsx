"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Users, DollarSign, TrendingUp, Award, FileText, Shield, Home, Scale, Building } from 'lucide-react';
import AffiliateBreadcrumb from '@/app/components/AffiliateBreadcrumb';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const AffiliateDetailsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto pt-4">
        <AffiliateBreadcrumb currentPage="details" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          src="/hero.jpg"
          alt="Affiliate Program"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 leading-tight tracking-tight">
              Affiliate Program
            </h1>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Become a strategic extension of our team, playing a key role in connecting diaspora clients with reliable real estate services. We&apos;re looking for enthusiastic individuals, real estate professionals, influencers, and community leaders who are passionate about helping others invest safely in Nigerian real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/affiliate/form" className="inline-block">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
                >
                  Become an Affiliate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Affiliate Role and Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Affiliate Program Details</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Your Role as an Affiliate */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Your Role as an Affiliate</h3>
                <div className="w-16 h-0.5 bg-green-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  As our affiliate, your responsibilities include:
                </p>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Promoting BAUC&apos;s full range of services to diaspora audiences.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Educating potential clients on the benefits of property vetting, project management, and financial advisory.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Referring individuals or groups interested in:</p>
                    <ul className="pl-5 mt-2 space-y-1 list-disc text-gray-600">
                      <li>Purchasing or investing in property.</li>
                      <li>Managing or developing real estate portfolios.</li>
                      <li>Seeking legal, financial, or supervisory support for their projects.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Acting as a liaison between your network and BAUC for a seamless onboarding process.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Earning commission for every successful referral that converts into a paying client.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Receive */}
            <div className="bg-gray-50 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">What You&apos;ll Receive</h3>
                <div className="w-16 h-0.5 bg-green-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  As part of the Affiliate Program, you will gain:
                </p>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-600">30% commission on our profit/percentage on each transaction.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-600">A dedicated affiliate dashboard to track your leads, conversions, and commissions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Access to branded marketing materials, sales guides, and social media content.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Ongoing training and webinars on the Nigerian real estate landscape and sales strategies.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div>
                    <p className="text-gray-600">Responsive support from our affiliate management team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About BAUC */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About BAUC International</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              BAUC International is a London-based real estate vetting and advisory company. For over 15 years, we&apos;ve supported diaspora clients in making secure, strategic real estate investments in Nigeria.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to bring credibility, transparency, and peace of mind to clients by thoroughly vetting developers and property portfolios, managing end-to-end real estate operations, and offering legal and financial guidance tailored for international investors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive suite of real estate services, tailored specifically for diaspora clients who want to invest confidently in Nigeria&apos;s property market.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-12 grid-rows-[repeat(16,minmax(50px,auto))] gap-5">
            {/* Portfolio Vetting - Large featured card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-12 md:col-span-8 row-span-6 md:row-span-6 bg-white rounded-lg shadow-lg overflow-hidden group relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300"></div>
              <div className="relative h-full p-8 flex flex-col z-10">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mr-5">
                      <Shield className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold">Portfolio Vetting</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    We ensure every property opportunity is authentic, secure, and investment-worthy through thorough verification processes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Legal ownership verification</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Physical property inspections</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Developer background checks</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Risk assessment reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Development Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-4 row-span-6 bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="h-full p-6 flex flex-col">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Development Management</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We manage properties from planning to completion, ensuring professional standards at every stage.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Project planning and execution</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Contractor coordination</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Quality assurance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Legal Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-6 md:col-span-4 row-span-5 bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="h-full p-6 flex flex-col">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Scale className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Legal Services</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Expert legal services to protect our clients&apos; investments and interests.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Legal documentation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Dispute resolution</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Legal representation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Supervision Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-6 md:col-span-4 row-span-5 bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="h-full p-6 flex flex-col">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Supervision</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Hands-on supervision of ongoing real estate operations and processes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Construction oversight</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Regulatory compliance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Resource management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-6 md:col-span-4 row-span-5 bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="h-full p-6 flex flex-col">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Home className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Portfolio Management</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Managing completed properties to maintain value and generate consistent returns.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Tenant management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Rent collection</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Property maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Investment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-6 md:col-span-5 row-span-5 bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="h-full p-6 flex flex-col">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Portfolio Investment</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Assisting clients in identifying and investing in high-potential properties.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Market trend analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Investment portfolio vetting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Flexible payment structures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Mortgage & Financial Partnerships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-6 md:col-span-7 row-span-5 bg-white rounded-lg shadow-lg overflow-hidden relative group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
              <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300"></div>
              <div className="relative h-full p-6 flex flex-col z-10">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Mortgage & Financial Partnerships</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Financial solutions enabling clients to invest comfortably in Nigerian real estate.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Access to mortgage providers</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Customized installment plans</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Personalized funding advice</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Affiliate Program Overview</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Partner with BAUC International and gain access to exclusive real estate investment opportunities while earning competitive commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-gray-200 p-8 hover:border-green-500 transition-colors duration-300"
            >
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Network Expansion</h3>
              <p className="text-gray-600">
                Expand your professional network in the real estate industry and connect with high-value clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border border-gray-200 p-8 hover:border-green-500 transition-colors duration-300"
            >
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Competitive Commissions</h3>
              <p className="text-gray-600">
                Earn generous commissions on each successful property referral, with transparent payment structures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-gray-200 p-8 hover:border-green-500 transition-colors duration-300"
            >
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Opportunities</h3>
              <p className="text-gray-600">
                Scale your earnings as you refer more clients, with performance-based incentives and bonuses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border border-gray-200 p-8 hover:border-green-500 transition-colors duration-300"
            >
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Support</h3>
              <p className="text-gray-600">
                Access comprehensive marketing materials, training, and dedicated support from our team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our affiliate program is designed to be simple, transparent, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 shadow-sm relative"
            >
              <div className="absolute -top-5 -left-5 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-3">Join Our Program</h3>
              <p className="text-gray-600 mb-4">
                Complete our simple application form, providing your personal and professional details.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Quick application process</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Review within 48 hours</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Immediate access upon approval</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 shadow-sm relative"
            >
              <div className="absolute -top-5 -left-5 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-3">Refer Clients</h3>
              <p className="text-gray-600 mb-4">
                Introduce potential investors to our premium real estate opportunities using your unique referral links.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Personalized referral dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Marketing materials provided</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Real-time tracking of referrals</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 shadow-sm relative"
            >
              <div className="absolute -top-5 -left-5 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-3">Earn Commissions</h3>
              <p className="text-gray-600 mb-4">
                Receive competitive commissions for every successful investment made through your referrals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Timely payments to your account</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Tiered commission structure</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Performance-based bonuses</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Movement</h2>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mb-8" />
            <p className="text-xl text-gray-700 mb-8">
              By partnering with BAUC International, you&apos;re helping your community make informed, safe, and profitable real estate decisions. Together, we can bridge the trust gap between diaspora investors and Nigerian real estate.
            </p>
            {/* <Link href="/affiliate">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300 inline-flex items-center"
              >
                Become an Affiliate
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-0" />
        <Image
          src="/hero.jpg"
          alt="Join Now"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Earning?</h2>
            <p className="text-lg text-white/90 mb-8">
              Join our affiliate program today and start earning commissions by connecting clients with premium real estate investment opportunities.
            </p>
            <Link href="/affiliate/form">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-md font-medium tracking-wide transition-all duration-300 inline-flex items-center"
              >
                Become an Affiliate
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AffiliateDetailsPage;
