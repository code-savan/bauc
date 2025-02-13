'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { Blog, Event } from '@/lib/supabase/types'
import Link from 'next/link'
import Image from 'next/image'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  blogs: Blog[]
  events: Event[]
}

export default function SearchModal({ isOpen, onClose, blogs, events }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlogs = blogs.filter(blog => {
    return blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  }).slice(0, 5) // Limit to 5 results

  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase())
  }).slice(0, 5) // Limit to 5 results

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term)
  }, 300)

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Search Articles and Events</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            placeholder="Search articles and events..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
          />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {/* Render Blogs */}
          {filteredBlogs.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Blogs</h3>
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold line-clamp-1 mb-1">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-space-mono">
                      By {blog.author}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Render Events */}
          {filteredEvents.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Events</h3>
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={event.banner_image || '/default-image.jpg'}
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
                      {/* {formatDate(event.created_at)} */}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
