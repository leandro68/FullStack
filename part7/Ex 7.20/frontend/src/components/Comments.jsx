import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { setBlog } from '../reducers/blogReducer'
import { setBlogs } from '../reducers/blogsReducer'

const Comments = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')
  const blog = useSelector((state) => state.blog)
  const blogs = useSelector((state) => state.blogs)

  const saveComment = (event) => {
    event.preventDefault()
    const newObject = { content: newComment }
    blogService
      .updateComments(id, newObject)
      .then((returnedBlog) => {
        console.log('returnedblog', returnedBlog)
        dispatch(setBlog(returnedBlog))
        dispatch(
          setBlogs(
            blogs.map((blog) =>
              blog.id === returnedBlog.id ? returnedBlog : blog
            )
          )
        )
        setNewComment('')
      })
      .then(() => {
        dispatch(setNotification(`Comment added ${newComment}`))
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

  return (
    <div>
      <h2>Comments</h2>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={saveComment}>save comment</button>
      <>
        {blog && blog.comments ? (
          blog.comments.map((comment, index) => <p key={index}>{comment}</p>)
        ) : (
          <p>No comments available</p>
        )}
      </>
    </div>
  )
}

export default Comments
