import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User } from 'lucide-react'
import RecentBlogs from '@/components/RecentBlogs'
import BlogSearch from '@/components/BlogSearch'

async function getBlogBySlug(slug: string) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !blog) {
    return null
  }

  return blog
}

async function getRecentBlogs() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  return blogs || []
}

export async function generateStaticParams() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug')

  return (blogs || []).map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const [blog, recentBlogs] = await Promise.all([
    getBlogBySlug(params.slug),
    getRecentBlogs()
  ])

  if (!blog) {
    notFound()
  }

  // Handle different content structures
  const getContent = () => {
    if (typeof blog.body === 'string') {
      return blog.body
    }
    if (typeof blog.body === 'object' && blog.body !== null) {
      return blog.body.content || ''
    }
    return ''
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Back Button */}
        <div className="absolute top-8 left-0 right-0 md:pl-20 pl-4 z-10">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-space-mono group"
         >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-3xl">
              {/* Meta info */}
              <div className="flex items-center gap-6 text-white/80 mb-6 font-space-mono text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By {blog.author}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display-fair leading-tight">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-green mx-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: getContent()
                }}
                className="prose-headings:font-display-fair prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-800
                  prose-blockquote:border-green-600 prose-blockquote:bg-green-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-img:rounded-xl prose-img:shadow-md"
              />
            </div>

            {/* Share and Navigation */}
            <div className="mt-16 pt-8 border-t">
              <div className="flex justify-between items-center">
                <Link
                  href="/blogs"
                  className="text-green-600 hover:text-green-700 font-space-mono flex items-center gap-2 group"
                >
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Link>

                {/* Add social share buttons here if needed */}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-8 sticky top-8">
              <BlogSearch blogs={recentBlogs} />
              <RecentBlogs blogs={recentBlogs} currentBlogId={blog.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
