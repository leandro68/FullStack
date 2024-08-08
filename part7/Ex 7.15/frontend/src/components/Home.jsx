import { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import usersService from '../services/users'
import { setUsers } from '../reducers/usersReducer'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      )
    usersService.getAll().then((users) => dispatch(setUsers(users)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const logedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(logedUser))
      blogService.setToken(logedUser.token)
    }
  }, [])

  useEffect(() => {
    usersService.getAll().then((users) => dispatch(setUsers(users)))
  }, [blogs])

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : <BlogForm />}
      <div>
        <ul data-testid="ulBlogs">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
