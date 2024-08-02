import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [viewData, setViewData] = useState(false)

  const updateBlogLikes = () => {
    //const blogToUpdate = blogs.find((n) => n.id === blog.id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(blog.id, changedBlog)
      .then((returnedBlog) => {
        console.log('returnedblog', returnedBlog)
        dispatch(
          setBlogs(blogs.map((b) => (blog.id !== b.id ? b : returnedBlog)))
        )
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

  return viewData && user ? (
    <div className="blog">
      <div className="blogTitle-container" data-testid="blogTitle">
        <p>
          {blog.title}, {blog.author}
        </p>
        <button className="viewButton" onClick={() => setViewData(false)}>
          hide
        </button>
      </div>
      <p className="url-container" data-testid="blogUrl">
        {blog.url}{' '}
      </p>
      <div className="likes-container" data-testid="blogLikes">
        <p>Likes: {blog.likes} </p>
        <button
          className="viewButton"
          onClick={updateBlogLikes}
          data-testid="blogLikeButton"
        >
          Like
        </button>
      </div>
      <p>{blog.user.name}</p>
      {user.id.toString() === blog.user.id.toString() ? (
        <button
          className="removeButton"
          onClick={removeBlog}
          data-testid="deleteBlog"
        >
          Remove
        </button>
      ) : (
        <br />
      )}
    </div>
  ) : (
    <div className="blog">
      <p>
        {blog.title}, {blog.author}
      </p>
      <button className="viewButton" onClick={() => setViewData(true)}>
        view
      </button>
    </div>
  )
}

export default Blog
