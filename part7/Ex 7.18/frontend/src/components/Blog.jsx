import { useEffect, useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import LoginForm from './LoginForm'
import Logout from './Logout'
import Notification from './Notification'
import Comments from './Comments'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  console.log('Blog id', id)
  console.log('Blogs', blogs)

  const blog = blogs.filter((blog) => blog.id === id)
  console.log('blog:', blog)

  const updateBlogLikes = () => {
    const changedBlog = { ...blog[0], likes: blog[0].likes + 1 }
    console.log('changedBlog', changedBlog)
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log('returnedblog', returnedBlog)
        dispatch(setBlogs(blogs.map((b) => (id !== b.id ? b : returnedBlog))))
      })
      .then(() => {
        dispatch(setNotification(`You voted for ${blog[0].title}`))
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
      <h1>{blog[0].title}</h1>
      <a href={blog[0].url}>{blog[0].url}</a>
      <div className="likes-container" data-testid="blogLikes">
        <p>{blog[0].likes} likes</p>
        <button
          className="viewButton"
          onClick={updateBlogLikes}
          data-testid="blogLikeButton"
        >
          Like
        </button>
      </div>
      <h3>by {blog[0].author}</h3>
      <Comments blog={blog[0]} />
    </div>
  ) : (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}
export default Blog
/*   
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
      <div >
        <p>Likes: {blog.likes} </p>
        
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
} */
