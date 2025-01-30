import Image from 'next/image'
import React from 'react'

const PropCard = ({image, name, title, pricerange, location, status, area, type, description }) => {
  return (
    <div
    // key={property.id}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
  >
    <div className="relative h-72 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4 bg-white/80  px-4 py-2 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-900">{pricerange}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-white/90">{location}</p>
      </div>
    </div>
    <div className="px-6 py-3">
        {/* desc */}
        <p className='font-mono text-[13px] mb-3 leading-tight'>The development of ‘The Hampshire’ is proposed to be a gated luxurious development and would boast</p>
      <div className="space-y-1">
        <div className="text-center py-1 rounded-lg flex justify-between items-center">
          <p className="text-[16px] text-gray-900 mb-1 font-bold">Status</p>
          <p className="font-medium text-gray-500 text-[15px]">{status}</p>
        </div>
        <div className="text-center py-1 rounded-lg flex justify-between items-center">
          <p className="text-[16px] text-gray-900 mb-1 font-bold">Title</p>
          <p className="font-medium text-gray-500 text-[15px]">{title}</p>
        </div>
        <div className="text-center py-1 rounded-lg flex justify-between items-center">
          <p className="text-[16px] text-gray-900 mb-1 font-bold">Area</p>
          <p className="font-medium text-gray-500 text-[15px]">{area}</p>
        </div>
        <div className="text-center py-1 rounded-lg flex justify-between items-center">
          <p className="text-[16px] text-gray-900 mb-1 font-bold">Type</p>
          <p className="font-medium text-gray-500 text-[15px]">{type}</p>
        </div>
      </div>
      <button className="w-full mt-4 bg-white text-green-600 font-semibold py-3 border-2 border-green-600 rounded-lg 2hover:bg-green-600 hover:text-white transition-colors duration-200">
        View Details
      </button>
    </div>
  </div>
  )
}

export default PropCard
