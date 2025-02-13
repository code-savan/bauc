'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Event } from '@/lib/supabase/types'

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/events/${event.slug}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={event.banner_image || '/default-image.jpg'}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 font-display-fair group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
            {event.title}
          </h3>
          <span className="text-sm text-gray-500 font-space-mono">
            {formatDate(event.created_at)}
          </span>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Hosted by: {event.hosted_by}</p>
            <p className="text-sm text-gray-600">Location: {event.location}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
