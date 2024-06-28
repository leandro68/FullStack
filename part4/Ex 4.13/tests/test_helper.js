const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog01',
    author: 'Author01',
    url: 'url1.com'
  },
  {
    title: 'Blog02',
    author: 'Author02',
    url: 'url2.com',
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}