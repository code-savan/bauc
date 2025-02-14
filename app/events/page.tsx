'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Event } from '@/lib/supabase/types'
import EventCard from '@/components/EventCard'
import EventSearch from '@/components/EventSearch'
import SearchModal from '@/components/SearchModal'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Search } from 'lucide-react'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search')?.toLowerCase()

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      setEvents(data)
      setIsLoading(false)
    }

    fetchEvents()

    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        async (payload) => {
          console.log('Change received!', payload)
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })

          if (!error && data) {
            setEvents(data)
          }
        }
      )
      .subscribe()

    setChannel(channel)

    return () => {
      if (channel) {
        channel.unsubscribe()
      }
    }
  }, [])

  const filteredEvents = events.filter(event => {
    if (!searchTerm) return true;
    return (
      event.title.toLowerCase().includes(searchTerm) ||
      (typeof event.description === 'object' && event.description !== null && 'content' in event.description && typeof event.description.content === 'string' && event.description.content.toLowerCase().includes(searchTerm))
    );
  });

  const latestEvent = filteredEvents[0]
  const regularEvents = filteredEvents.slice(1)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display-fair">
            Our Events
          </h1>
          <p className="text-xl text-white/90 max-w-2xl font-inter leading-relaxed">
            Join us for our upcoming events and stay connected with the community.
          </p>
          <div className="relative mt-4 w-fit" onClick={() => setIsModalOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          className="md:w-72 w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />

      </div>
        </div>
      </div>

      {/* Latest Event Section */}
      {latestEvent && (
        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[300px] md:h-full">
                <Image
                  src={latestEvent.banner_image || '/default-image.jpg'}
                  alt={latestEvent.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-display-fair mb-4">
                  {latestEvent.title}
                </h2>
                <div className="flex items-center gap-3 text-gray-600 mb-6 font-space-mono text-sm">
                  <span>{formatDate(latestEvent.created_at || '')}</span>
                  <span>•</span>
                  <span>Hosted by: {latestEvent.hosted_by}</span>
                  <span>•</span>
                  <span>Location: {latestEvent.location}</span>
                </div>
                <Link
                  href={`/events/${latestEvent.slug}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit font-space-mono"
                >
                  View Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))
          ) : regularEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blogs={[]} events={events} developers={[]} />
    </main>
  )
}
