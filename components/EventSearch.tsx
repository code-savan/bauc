'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Event } from '@/lib/supabase/types'
import Link from 'next/link'
import Image from 'next/image'

interface EventSearchProps {
  events: Event[]
}

export default function EventSearch({ events }: EventSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase())
  }).slice(0, 5) // Limit to 5 results

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term)
  }, 300)

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          placeholder="Search events..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />
      </div>

      {/* Dropdown Results */}
      {filteredEvents.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-[400px] overflow-y-auto">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 transition-colors"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold line-clamp-1 mb-1">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-500 font-space-mono">
                  {formatDate(event.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
