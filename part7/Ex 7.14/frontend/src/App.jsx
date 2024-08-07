import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import UsersList from './components/UsersList'
import usersService from './services/users'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
    if (user === null) {
      setUsername('')
      setPassword('')
    }
  }, [user])

  useEffect(() => {
    usersService.getAll().then((users) => dispatch(setUsers(users)))
  }, [blogs])

  const handleLogout = (event) => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    setUsername('')
    setPassword('')
    setLoginVisible(false)
    dispatch(setNotification('Logout successful'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    setBlogs(blogs)
  }

  const handleAddBlog = (event) => {
    blogFormVisible ? setBlogFormVisible(false) : setBlogFormVisible(true)
  }

  const loginForm = () => {
    const showLoginButton = { display: loginVisible ? 'none' : '' }
    const showLoginForm = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={showLoginButton}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showLoginForm}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // RENDER --------------------------------------------------

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h1>Log in to application</h1>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h1>Blogs</h1>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>logout</button>
          </div>
          <BlogForm
            handleAddBlog={handleAddBlog}
            blogFormVisible={blogFormVisible}
            setBlogFormVisible={setBlogFormVisible}
          />
        </div>
      )}
      <div>
        <ul data-testid="ulBlogs">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </ul>
        <UsersList />
      </div>
    </div>
  )
}

export default App
