import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Blog } from '@/lib/supabase/types'

interface RecentBlogsProps {
  blogs: Blog[]
  currentBlogId?: string
}

export default function RecentBlogs({ blogs, currentBlogId }: RecentBlogsProps) {
  const filteredBlogs = blogs.filter(blog => blog.id !== currentBlogId).slice(0, 3)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
      <h3 className="text-xl font-display-fair mb-6">Recent Articles</h3>
      <div className="space-y-6">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group block"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold group-hover:text-green-600 transition-colors line-clamp-2 mb-1">
                  {blog.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-space-mono">
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
