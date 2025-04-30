"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Building, Construction, Home, Ruler, Hammer, HardHat, FileText, PenTool } from 'lucide-react'

export default function PropertyDetails({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Properties Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Property Details</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Property ID: {params.id}
          </p>
        </div>
      </div>

      {/* Improved Under Construction Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-30">
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative p-8 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Home className="h-24 w-24 text-gray-300" strokeWidth={1} />
                  <div className="absolute -top-2 -right-2 bg-green-100 p-2 rounded-full">
                    <PenTool className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                  </div>
                </div>
            </div>

              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-green-600 mb-2" strokeWidth={1} />
                  <span className="text-xs text-gray-500">Details</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <Ruler className="h-8 w-8 text-green-600 mb-2" strokeWidth={1} />
                  <span className="text-xs text-gray-500">Dimensions</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <HardHat className="h-8 w-8 text-green-600 mb-2" strokeWidth={1} />
                  <span className="text-xs text-gray-500">Status</span>
                </div>
              </div>

              <div className="w-full h-4 bg-gray-200 my-6 rounded-full">
                <div className="h-full w-2/5 bg-green-600 rounded-full"></div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm w-fit mx-auto">
                <Construction className="h-12 w-12 text-green-600" strokeWidth={1.5} />
              </div>
            </div>
            </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">Building Property Details</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is currently developing a comprehensive details page for this property.
            We&apos;re crafting an interactive experience to showcase all property features.
          </p>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="text-gray-500 mr-2">Estimated completion: Soon</span>
              <div className="flex gap-4">
                <Link href="/vetted-properties">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Properties
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
