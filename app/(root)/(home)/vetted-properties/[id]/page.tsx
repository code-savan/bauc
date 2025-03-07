"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { Property } from '@/lib/supabase/types'
import {
  MapPin, Home, Calendar, Shield, Landmark, Tag,
  CheckCircle, ArrowLeft, Building, DollarSign, ShieldCheck, ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { amenities as allAmenities } from '@/lib/constants'
import React from 'react'

export default function PropertyDetails({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          setProperty(data)
          setActiveImage(data.full_image || data.thumbnail || (data.gallery && data.gallery[0]) || null)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

  const getContent = () => {
    if (typeof property?.description === 'string') {
      return property.description
    }
    if (typeof property?.description === 'object' && property?.description !== null) {
      return property.description.content || ''
    }
    return ''
  }

  if (loading) {
    return <PropertyDetailsSkeleton />
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Property Not Found</h1>
        <p className="mb-8">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/vetted-properties">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-[400px] md:h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          src={property.full_image || '/placeholder-property.jpg'}
          alt="Properties Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-[65px] font-bold text-white mb-4 text-center px-4">{property.title}</h1>
          <Link href={property.website || '#'}
          className="text-[13px] text-white/90 text-center underline font-space-mono mt-4">
            Visit Website
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-[150px] mx-auto py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            {/* features and details */}
            <div className="my-8">
              {/* Property details */}
                <div className="">
                  {/* <h2 className="text-xl font-semibold mb-6 font-mono">Property Details</h2> */}

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="flex flex-col md:table-row">
                          <td className="border-b md:border-b md:border-r border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Building className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Type</span>
                              </div>
                              <span className="text-green-600 capitalize">
                                {property.property_type || property.type || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className=" md:border-r  border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Home className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Area</span>
                              </div>
                              <span className="text-green-600">
                                {property.area ? `${property.area} sqm` : "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="border-b  md:border-b border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Shield className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Land Status</span>
                              </div>
                              <span className="text-green-600">
                                {property.land_status || "N/A"}
                              </span>
                            </div>
                          </td>
                        </tr>

                        <tr className="flex flex-col md:table-row">
                          <td className="border-b md:border-b border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Completion Date</span>
                              </div>
                              <span className="text-green-600">
                                {property.completion_date || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="  border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Payment Terms</span>
                              </div>
                              <span className="text-green-600">
                                {property.payment_term || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="border-b md:border-b border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Landmark className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Landmark</span>
                              </div>
                              <span className="text-green-600">
                                {property.land_mark || "N/A"}
                              </span>
                            </div>
                          </td>
                        </tr>

                        <tr className="flex flex-col md:table-row">
                          <td className="border-b md:border-r md:border-b border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <Tag className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Discount</span>
                              </div>
                              <span className="text-green-600 font-medium">
                                {property.discount || "None"}
                              </span>
                            </div>
                          </td>
                          <td className=" md:border-r  border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <CheckCircle className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Status</span>
                              </div>
                              <span className="text-green-600 font-medium">
                                {property.status || "Approved"}
                              </span>
                            </div>
                          </td>
                          <td className="border-b md:border-b border-gray-200 w-full md:w-1/3 h-auto md:h-[180px]">
                            <div className="flex flex-col items-center justify-center py-6 md:h-[180px] text-center w-full md:w-[80%] mx-auto">
                              <div className="flex items-center justify-start mb-3">
                                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="font-semibold text-gray-600 font-mono">Location</span>
                              </div>
                              <span className="text-green-600">
                                {Array.isArray(property.location)
                                  ? property.location.join(', ')
                                  : property.location || "N/A"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


              {/* Contact section */}
              {/* <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Interested?</h2>
                <p className="text-gray-600 mb-4">Contact us for more information about this property.</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Contact Agent
                </Button>
              </div> */}
            </div>


             {/* Property title price and description */}
              <div className="py-4 w-full my-4 md:my-8">
                {/* Description */}
                <div className="flex flex-col md:flex-row items-start border-b border-gray-200 py-4 md:py-6">
                  <div className="w-full md:w-2/6 mb-3 md:mb-0">
                    <span className="font-bold text-gray-700">Description</span>
                  </div>
                  <div className="w-full md:w-4/6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getContent()
                      }}
                      className="text-gray-600"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-4 md:py-6">
                  <div className="w-full md:w-2/6 mb-3 md:mb-0">
                    <span className="font-bold text-gray-700">Price</span>
                  </div>
                  <div className="w-full md:w-4/6">
                    <span className="text-green-600 font-semibold">
                      {property.price_range || "Contact for price"}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col md:flex-row items-start md:items-center py-4 md:py-6">
                  <div className="w-full md:w-2/6 mb-3 md:mb-0">
                    <span className="font-bold text-gray-700">Location</span>
                  </div>
                  <div className="w-full md:w-4/6">
                    <span className="text-gray-600">
                      {property.land_mark}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="py-4 w-full my-4 md:my-8">
                <div className="py-4 md:py-6">
                  <div className="w-full text-center">
                    <span className="font-bold text-gray-700 text-xl md:text-2xl">Amenities</span>
                  </div>
                  <div className="w-full mt-4 md:mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      {/* Display 12 random amenities from our constants file */}
                      {(() => {
                        // Get 12 random amenities from our constants
                        const randomAmenities = [...allAmenities]
                          .sort(() => 0.5 - Math.random())
                          .slice(0, 12);

                        return randomAmenities.map((amenity, index) => {
                          const Icon = amenity.icon;
                          return (
                            <div
                              key={index}
                              className="bg-white px-3 py-6 md:px-4 md:py-8 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:shadow-lg hover:shadow-gray-100 transition-shadow duration-300"
                            >
                              <div className="bg-green-50 p-2 md:p-3 rounded-full mb-2 md:mb-3">
                                <Icon className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                              </div>
                              <span className="text-xs md:text-[14px] font-medium text-gray-700">{amenity.label}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6 mt-8 md:mt-16">
              {/* Main image */}
              <div className="relative rounded-xl overflow-hidden h-[250px] md:h-[400px] bg-gray-100">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Home className="h-16 w-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Gallery thumbnails */}
              {property.gallery && property.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {property.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`relative rounded-lg overflow-hidden h-[80px] sm:h-[100px] md:h-[125px] cursor-pointer border-2 ${
                        activeImage === image ? 'border-green-500' : 'border-transparent'
                      }`}
                      onClick={() => setActiveImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>



            {/* Location and map */}
            <div className="my-12 md:my-24">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.755658408975!2d7.456591375266091!3d9.086009790977604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b929d261bc1%3A0xf87655077fcf6153!2sKINGFEM%20GA247!5e0!3m2!1sen!2sng!4v1741265848815!5m2!1sen!2sng"
              width="100%"
              height="300"
              className="md:h-[500px]"
              style={{border:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            </div>

            {/* Express Interest Section */}
            <div className="my-16 md:my-24 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Intrested in this Property?</h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12">
                  Take the first step toward your dream home with BAUC International
                </h1>

                <Link href={`/express-interest?property=${property.id}`} className="inline-block">
                  <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-full text-lg font-medium">
                    Express Interest <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

              {/* other properties... */}
            <div className="my-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Similar Properties</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Property Card 1 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-[220px] overflow-hidden">
                    <Link href="/vetted-properties/modern-house">
                      <div className="absolute inset-0 hover:scale-110 transition-transform duration-700">
                        <Image
                          src="/images/properties/modern-house.jpg"
                          alt="Modern House"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Modern House</h3>
                    <p className="text-green-600 font-semibold mb-1">$ 600.00 USD /night</p>
                    <p className="text-gray-500 text-sm">LA, California</p>
                  </div>
                </div>

                {/* Property Card 2 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-[220px] overflow-hidden">
                    <Link href="/vetted-properties/loft-penthouse">
                      <div className="absolute inset-0 hover:scale-110 transition-transform duration-700">
                        <Image
                          src="/images/properties/loft-penthouse.jpg"
                          alt="Loft Penthouse"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Loft Penthouse</h3>
                    <p className="text-green-600 font-semibold mb-1">$ 1,300.00 USD /night</p>
                    <p className="text-gray-500 text-sm">LA, California</p>
                  </div>
                </div>

                {/* Property Card 3 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-[220px] overflow-hidden">
                    <Link href="/vetted-properties/spectral-house">
                      <div className="absolute inset-0 hover:scale-110 transition-transform duration-700">
                        <Image
                          src="/images/properties/spectral-house.jpg"
                          alt="Spectral House"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Spectral House</h3>
                    <p className="text-green-600 font-semibold mb-1">$ 700.00 USD /night</p>
                    <p className="text-gray-500 text-sm">LA, California</p>
                  </div>
                </div>

                {/* Property Card 4 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-[220px] overflow-hidden">
                    <Link href="/vetted-properties/sustainable-serenity-villa">
                      <div className="absolute inset-0 hover:scale-110 transition-transform duration-700">
                        <Image
                          src="/images/properties/sustainable-villa.jpg"
                          alt="Sustainable Serenity Villa"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Sustainable Serenity Villa</h3>
                    <p className="text-green-600 font-semibold mb-1">$ 650.00 USD /night</p>
                    <p className="text-gray-500 text-sm">LA, California</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back button */}
            <Link href="/vetted-properties" className="inline-flex items-center mb-8 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>


        </motion.div>
      </div>
    </main>
  )
}

// Skeleton loader for property details
function PropertyDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="relative h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <div className="h-16 w-3/4 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-4 w-40 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />

            <div className="grid grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-6 w-40 mb-4" />

              <div className="space-y-4">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    {index < 4 && <Skeleton className="h-px w-full" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
