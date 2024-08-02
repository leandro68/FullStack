import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setNotification } from './components/reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    event.preventDefault()
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        console.log('blog agregado', returnedBlog)
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
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
  }

  const updateBlogLikes = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log(returnedBlog)
        setBlogs(
          blogs
            .map((blog) => (blog.id !== id ? blog : returnedBlog))
            .sort((a, b) => b.likes - a.likes)
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

  const removeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id)
    if (!blog) {
      dispatch(setNotification('Blog has already removed'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    } else {
      blogService
        .remove(id)
        .then(() =>
          setBlogs(
            blogs
              .filter((blog) => blog.id !== id)
              .sort((a, b) => b.likes - a.likes)
          )
        )
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('usuario logueado', user)
    } catch (exception) {
      dispatch(setNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setLoginVisible(false)
    dispatch(setNotification('Logout successful'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
            handleSubmit={handleLogin}
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
            createBlog={addBlog}
            handleAddBlog={handleAddBlog}
            blogFormVisible={blogFormVisible}
          />
        </div>
      )}
      <div>
        <ul data-testid="ulBlogs">
          {blogs.map((blog) => (
            <Blog
              updateBlogLikes={() => updateBlogLikes(blog.id)}
              removeBlog={() => removeBlog(blog.id)}
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
