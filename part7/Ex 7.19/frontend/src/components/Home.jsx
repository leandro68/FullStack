import { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import usersService from '../services/users'
import { setUsers } from '../reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

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
            <li key={blog.id} className="blog">
              {
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
