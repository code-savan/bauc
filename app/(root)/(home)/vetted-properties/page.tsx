"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Building, Construction, Landmark, Home, Hammer, HardHat } from 'lucide-react'

export default function VettedProperties() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Properties Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Vetted Projects</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our carefully vetted real estate projects across Nigeria&apos;s prime locations.
          </p>
        </div>
      </div>

      {/* Improved Under Construction Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-30">
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/construction.png" alt="Vetted Properties" width={400} height={400} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Building Something Amazing</h2>
          <p className="text-[15px] text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
            Our team is currently developing an exceptional experience for our vetted properties platform.
            <br className="md:block hidden" />We&apos;re adding premium features to make your property search seamless.
          </p>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="text-gray-500 mr-2">Estimated completion: Soon</span>
              <Link href="/">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
