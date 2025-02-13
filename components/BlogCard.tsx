'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  id: string
  title: string
  author: string
  slug: string
  image: string
  created_at?: string
}

const BlogCard = ({ title, author, slug, image, created_at }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <Link href={`/blogs/${slug}`}>
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <Image
             src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500 font-space-mono">
                {formatDate(created_at || '')}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500 font-space-mono">
                By {author}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 font-display-fair group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>

            <span className="text-green-600 text-sm font-space-mono group-hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogCard
