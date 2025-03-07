"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import PropCard from '@/components/PropCard'
import { motion } from 'framer-motion'
import { Pagination } from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Property } from '@/lib/supabase/types'
import Image from 'next/image'

export default function VettedProperties({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const currentPage = Number(searchParams?.page) || 1
  const pageSize = 20

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true)
      try {
        // Calculate pagination
        const from = (currentPage - 1) * pageSize
        const to = from + pageSize - 1

        // Fetch properties with pagination
        const { data, error, count } = await supabase
          .from('properties')
          .select('*', { count: 'exact' })
        //   .eq('status', 'pending')
          .range(from, to)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          setProperties(data)
          // Calculate total pages
          if (count) {
            setTotalPages(Math.ceil(count / pageSize))
          }
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [currentPage])

  // Skeleton loader for properties
  const PropertySkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-72 w-full bg-gray-200"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-full bg-gray-200"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-6"></div>
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )

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

      {/* Filter Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Status</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Status</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="awaiting">Awaiting Approval</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed Use</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Location</option>
                <option value="abuja">Abuja</option>
                <option value="lagos">Lagos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Budget Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Budget</option>
                <option value="low">Below ₦50M</option>
                <option value="medium">₦50M - ₦200M</option>
                <option value="high">Above ₦200M</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold shadow-sm hover:shadow-md">
              Search Properties
            </button>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Show skeletons while loading
            Array(3).fill(0).map((_, index) => (
              <PropertySkeleton key={index} />
            ))
          ) : properties.length > 0 ? (
            // Show properties
            properties.map((property) => (
              <Link href={`/vetted-properties/${property.id}`} key={property.id}>
                <PropCard
                  image={property.thumbnail || property.full_image || '/placeholder-property.jpg'}
                  name={property.title}
                  location={Array.isArray(property.location) ? property.location.join(', ') : property.location}
                  status={property.status || "Approved"}
                  area={property.area ? `${property.area} sqm` : 'N/A'}
                  type={property.property_type || property.type || "Residential"}
                  price={property.price_range || "Contact for price"}
                  description={typeof property.description === 'object'
                    ? property.description.content
                    : property.description || "No description available"}
                  land_status={property.land_status || "N/A"}
                />
              </Link>
            ))
          ) : (
            // No properties found
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No properties found</h3>
              <p className="text-gray-500 mt-2">Please check back later for new listings.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl="/vetted-properties"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
