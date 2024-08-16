import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const addBlog = (event) => {
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
      {blogFormVisible ? (
        <div>
          <Form onSubmit={addBlog}>
            <Form.Group>
              <Form.Label>title: </Form.Label>
              <Form.Control
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                data-testid="blogTitle"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>author: </Form.Label>
              <Form.Control
                value={newAuthor}
                onChange={(event) => setNewAuthor(event.target.value)}
                data-testid="blogAuthor"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>url: </Form.Label>
              <Form.Control
                value={newUrl}
                onChange={(event) => setNewUrl(event.target.value)}
                data-testid="blogUrl"
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Save
            </Button>
            <br />
          </Form>
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
