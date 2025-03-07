'use client'

import Image from 'next/image'
import React from 'react'
import { BiBed } from 'react-icons/bi'
import { BiBath } from 'react-icons/bi'
import { BiArea } from 'react-icons/bi'
import { MdApartment } from 'react-icons/md'
import { motion } from 'framer-motion'
import { ShieldCheck, Star } from 'lucide-react'

const PropCard = ({
  image,
  name,
  location,
  status = "Awaiting approval",
  area,
  type = "Residential",
  price,
  description,
  land_status
}) => {
  // Format description to plain text if it contains HTML
  const formatDescription = (desc) => {
    if (!desc) return "No description available";

    // If description is HTML, convert to plain text
    if (desc.includes('<p>') || desc.includes('<strong>')) {
      // Create a temporary element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = desc;
      return tempDiv.textContent || tempDiv.innerText || "No description available";
    }

    return desc;
  };

  // Format location if it's an array
  const formatLocation = (loc) => {
    if (Array.isArray(loc)) {
      return loc.join(', ');
    }
    return loc || "Location not specified";
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    const statusLower = status.toLowerCase();
    if (statusLower.includes("approved")) return "bg-green-100 text-green-800";
    if (statusLower.includes("pending")) return "bg-yellow-100 text-yellow-800";
    if (statusLower.includes("awaiting")) return "bg-blue-100 text-blue-800";

    return "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer hover:translate-y-[-5px] h-[517px]"
    >
      <div className="relative h-72 border overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getStatusColor(status)} text-xs font-medium backdrop-blur-sm`}>
          {status}
        </div>
        <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-space-mono backdrop-blur-sm">
          {price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-sm transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-green-700 font-space-mono shadow-lg">
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-50 p-1.5 rounded-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-green-600"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-gray-600 font-space-mono text-sm">{formatLocation(location)}</span>
        </div>

        <h3 className="text-xl font-semibold mb-2 font-display-fair line-clamp-1 group-hover:text-green-700 transition-colors">{name}</h3>
        <p className="text-gray-500 text-sm mb-5 line-clamp-2">{formatDescription(description)}</p>

        <div className="flex items-center justify-between mb-0 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1.5 rounded-full">
              <MdApartment className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-600 capitalize">{type}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1.5 rounded-full">
              <BiArea className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-600">{area}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-600">{land_status || "N/A"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PropCard
