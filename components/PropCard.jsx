'use client'

import Image from 'next/image'
import React from 'react'
import { BiBed } from 'react-icons/bi'
import { BiBath } from 'react-icons/bi'
import { BiArea } from 'react-icons/bi'
import { MdApartment } from 'react-icons/md'
import { motion } from 'framer-motion'

const PropCard = ({
  image,
  name,
  location,
  status = "Awaiting approval",
  area,
  type = "Residential",
  price,
  description
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
    >

      <div className="relative h-72">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
          {status}
        </div>
        <div className="absolute top-4 left-4 px-4 py-2 bg-black/80 text-white rounded-lg text-sm font-space-mono">
          {price}
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-sm transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-green-700 font-space-mono">
            View Details
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
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
          <span className="text-gray-600 font-space-mono">{location}</span>
        </div>

        <h3 className="text-2xl font-semibold mb-3 font-display-fair">{name}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MdApartment className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{type}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiArea className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{area}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiArea className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{area}</span>
          </div>
        </div>
{/*
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-space-mono">Starting from</span>
            <span className="text-xl font-semibold font-sans">{price}</span>
          </div>
        </div> */}
      </div>
    </motion.div>
  )
}

export default PropCard
