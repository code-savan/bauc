const filteredBlogs = blogs.filter(blog => {
  if (!searchTerm) return true
  return (
    blog.title.toLowerCase().includes(searchTerm) ||
    blog.author.toLowerCase().includes(searchTerm) ||
    (typeof blog.body === 'string' && blog.body.toLowerCase().includes(searchTerm)) ||
    (typeof blog.body === 'object' && blog.body.content && typeof blog.body.content === 'string' && blog.body.content.toLowerCase().includes(searchTerm))
  )
})
