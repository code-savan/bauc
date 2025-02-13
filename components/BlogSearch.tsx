'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Blog } from '@/lib/supabase/types'
import Link from 'next/link'
import Image from 'next/image'

interface BlogSearchProps {
  blogs: Blog[]
}

export default function BlogSearch({ blogs }: BlogSearchProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredBlogs = blogs.filter(blog => {
    if (!searchTerm) return false
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }).slice(0, 5) // Limit to 5 results

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term)
    setIsOpen(term.length > 0)
  }, 300)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          placeholder="Search articles..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredBlogs.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-[400px] overflow-y-auto">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setIsOpen(false)
                setSearchTerm('')
              }}
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
    </div>
  )
}
