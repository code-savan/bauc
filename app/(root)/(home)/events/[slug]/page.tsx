'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Event } from '@/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock, MapPinned, User } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

async function getEventBySlug(slug: string) {
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !event) {
    return null
  }

  return event
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventBySlug(params.slug)
      if (!fetchedEvent) {
        notFound()
      } else {
        setEvent(fetchedEvent)
      }
      setLoading(false)
    }

    fetchEvent()
  }, [params.slug])

  const getDescription = () => {
    if (typeof event?.description === 'string') {
      return event.description
    }
    if (typeof event?.description === 'object' && event.description !== null) {
      return event.description.content || ''
    }
    return 'Event details not available.'
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
    <div className="loader">
  <span className="bar"></span>
  <span className="bar"></span>
  <span className="bar"></span>
</div>
  </div>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src={event?.banner_image || '/default-image.jpg'}
          alt={event?.title || 'Event Banner'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        {/* Back Button */}
        <div className="absolute top-8 left-0 right-0 md:pl-20 pl-3 z-10">
          <Link
            href="/events"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-space-mono group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex items-center flex-wrap gap-4 text-white mb-6 font-space-mono text-[14px]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatDate(event?.created_at || '')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{event?.hosted_by}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinned className="w-4 h-4" />
              <span>{event?.location}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display-fair">
            {event?.title}
          </h1>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="prose prose-lg prose-green mx-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: getDescription(),
            }}
            className="prose-headings:font-display-fair prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-800
              prose-blockquote:border-green-600 prose-blockquote:bg-green-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:shadow-md"
          />
        </div>

        {/* Gallery Section */}
        {event?.gallery && event.gallery.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Gallery</h3>
            <Slider {...sliderSettings}>
              {event.gallery.map((image: string, index: number) => (
                <div key={index} className="relative h-[400px] md:h-[600px]">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full border-none outline-none object-top"
                    onLoad={() => console.log('Image loaded')}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {/* Video Section */}
        {event?.event_video && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Event Video</h3>
            <video controls className="w-full rounded-lg">
              <source src={event.event_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

         {/* Share and Navigation */}
         <div className="mt-16 pt-8 border-t">
              <div className="flex justify-between items-center">
                <Link
                  href="/events"
                  className="text-blue-600 hover:text-blue-700 font-space-mono flex items-center gap-2 group"
                >
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  Back to Events
                </Link>

                {/* Add social share buttons here if needed */}
              </div>
            </div>
      </div>
    </main>
  )
}
