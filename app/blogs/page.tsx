'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { supabase } from '@/lib/supabase/client'
import { Blog } from '@/lib/supabase/types'
import { RealtimeChannel } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import BlogSearch from '@/components/BlogSearch'
import SearchModal from '@/components/SearchModal'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search')?.toLowerCase()

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blogs:', error)
        return
      }

      setBlogs(data)
      setIsLoading(false)
    }

    fetchBlogs()

    const channel = supabase
      .channel('blogs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        async (payload) => {
          console.log('Change received!', payload)
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false })

          if (!error && data) {
            setBlogs(data)
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

  const filteredBlogs = blogs.filter(blog => {
    if (!searchTerm) return true
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      (blog.body && typeof blog.body.content === 'string' && blog.body.content.toLowerCase().includes(searchTerm))
    )
  })

  const featuredBlog = filteredBlogs[0]
  const regularBlogs = filteredBlogs.slice(1)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-green-900 to-green-700">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display-fair">
            Our Blogs
          </h1>
          <p className="text-xl text-white/90 max-w-2xl font-inter leading-relaxed">
            Stay informed about the Nigerian real estate market with our latest insights,
            market analysis, and investment opportunities.
          </p>


        <div className="relative mt-4 w-fit" onClick={() => setIsModalOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search articles..."
          className="md:w-72 w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-space-mono text-sm"
        />

      </div>

        </div>
      </div>

      {/* Featured Blog Section */}
      {featuredBlog && (
        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[300px] md:h-full">
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-space-mono inline-block mb-6 w-fit">
                  Featured Post
                </div>
                <h2 className="text-3xl font-display-fair mb-4">
                  {featuredBlog.title}
                </h2>
                <div className="flex items-center gap-3 text-gray-600 mb-6 font-space-mono text-sm">
                  <span>{new Date(featuredBlog.created_at!).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>By {featuredBlog.author}</span>
                </div>
                <Link
                  href={`/blogs/${featuredBlog.slug}`}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-fit font-space-mono"
                >
                 Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
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
          ) : regularBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              author={blog.author}
              slug={blog.slug || ''}
              image={blog.image}
              created_at={blog.created_at}
            />
          ))}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blogs={blogs} events={[]} />
    </main>
  )
}
