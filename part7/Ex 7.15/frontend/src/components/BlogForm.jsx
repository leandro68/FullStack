import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import Logout from './Logout'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const addBlog = (eventt) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        console.log('blog agregado', returnedBlog)
        dispatch(appendBlog(returnedBlog))
        setBlogFormVisible(false)
        dispatch(
          setNotification(
            `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`
          )
        )
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
    } catch (error) {
      console.log('error', error)
      dispatch(setNotification(error))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleAddBlog = (event) => {
    blogFormVisible ? setBlogFormVisible(false) : setBlogFormVisible(true)
  }

  return (
    <div>
      <Logout />
      {blogFormVisible ? (
        <div>
          <form onSubmit={addBlog}>
            <div>
              <label>title: </label>
              <input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                data-testid="blogTitle"
              />
            </div>
            <div>
              <label>author: </label>
              <input
                value={newAuthor}
                onChange={(event) => setNewAuthor(event.target.value)}
                data-testid="blogAuthor"
              />
            </div>
            <div>
              <label>url: </label>
              <input
                value={newUrl}
                onChange={(event) => setNewUrl(event.target.value)}
                data-testid="blogUrl"
              />
            </div>
            <br />
            <button type="submit">Save</button>
            <br />
          </form>
          <button onClick={() => handleAddBlog(!blogFormVisible)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleAddBlog(!blogFormVisible)}>
            Add Blog
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogForm
