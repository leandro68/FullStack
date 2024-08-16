import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Comments from './Comments'
import { setBlog } from '../reducers/blogReducer'
import { useEffect } from 'react'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blog)

  console.log('Blog id', id)
  console.log('Blogs', blogs)

  useEffect(() => {
    const selectedBlog = blogs.find((blog) => blog.id === id)
    if (selectedBlog) {
      dispatch(setBlog(selectedBlog))
    }
  }, [id, blogs, dispatch])

  /* const selectedBlog = blogs.filter((blog) => blog.id === id)
  dispatch(setBlog(selectedBlog[0]))
  console.log('blog:', blog) */

  const updateBlogLikes = () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('changedBlog', changedBlog)
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log('returnedblog', returnedBlog)
        dispatch(setBlogs(blogs.map((b) => (id !== b.id ? b : returnedBlog))))
      })
      .then(() => {
        dispatch(setNotification(`You voted for ${blog.title}`))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
      .catch((error) => {
        dispatch(setNotification('Blog was already removed from server'))
        console.log('error: ', error)
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
  }

  const removeBlog = () => {
    const blogToRemove = blogs.find((n) => n.id === blog.id)
    if (!blogToRemove) {
      dispatch(setNotification('Blog has already removed'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    } else {
      blogService
        .remove(blog.id)
        .then(() => dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id))))
        .then(() => {
          dispatch(setNotification(`You removed blog: ${blog.title}`))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
        })
        .catch((error) => {
          dispatch(setNotification(error.response.data.error))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
        })
    }
  }

  console.log('Blog => user', user)
  return user ? (
    <div>
      <Notification />
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div className="likes-container" data-testid="blogLikes">
        <p>{blog.likes} likes</p>
        <button
          className="viewButton"
          onClick={updateBlogLikes}
          data-testid="blogLikeButton"
        >
          Like
        </button>
      </div>
      <h3>by {blog.author}</h3>
      <Comments blog={blog} />
    </div>
  ) : (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}
export default Blog
