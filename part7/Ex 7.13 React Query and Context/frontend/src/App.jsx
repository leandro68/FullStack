import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useReducer } from 'react'
import { useBlogsValue, useBlogsDispatch } from './contexts/blogContext'
import { useUserValue, useUserDispatch } from './contexts/userContext'

const messageReducer = (state, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return []
  }
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const blogs = useBlogsValue()
  const blogsDispatch = useBlogsDispatch()
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const [message, messageDispatch] = useReducer(messageReducer, null)

  useEffect(() => {
    blogService
      .getAll()
      .then((returnedBlogs) =>
        blogsDispatch({ type: 'SET', payload: returnedBlogs }),
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: userLogged })
      blogService.setToken(userLogged.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    event.preventDefault()
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        console.log('blog agregado', returnedBlog)
        blogsDispatch({ type: 'APPEND', payload: returnedBlog })
        setBlogFormVisible(false)
        messageDispatch({
          type: 'SET',
          payload: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        })
        setTimeout(() => {
          messageDispatch({ type: 'SET', payload: null })
        }, 5000)
      })
    } catch (error) {
      console.log('error', error)
      messageDispatch({ type: 'SET', payload: error })
      setTimeout(() => {
        messageDispatch({ type: 'SET', payload: null })
      }, 5000)
    }
  }

  const updateBlogLikes = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('before lilke', blogs)
    try {
      blogService.update(id, changedBlog).then((returnedBlog) => {
        blogsDispatch({ type: 'LIKE', payload: returnedBlog })
        console.log('after like', blogs)
        messageDispatch({
          type: 'SET',
          payload: `You voted for: ${blog.title}`,
        })
        setTimeout(() => {
          messageDispatch({ type: 'SET', payload: null })
        }, 5000)
      })
    } catch (error) {
      messageDispatch({
        type: 'SET',
        payload: 'Blog was already removed from server',
      })
      console.log('error: ', error)
      setTimeout(() => {
        messageDispatch({ type: 'SET', payload: null })
      }, 5000)
    }
  }

  const removeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id)
    if (!blog) {
      messageDispatch({ type: 'SET', payload: 'Blog has already removed' })
      setTimeout(() => {
        messageDispatch({ type: 'SET', payload: null })
      }, 5000)
    } else {
      blogService
        .remove(id)
        .then(
          () => {
            blogsDispatch({ type: 'DELETE', payload: blog.id })
          },
          messageDispatch({
            type: 'SET',
            payload: 'Blog removed',
          }),
          setTimeout(() => {
            messageDispatch({ type: 'SET', payload: null })
          }, 5000),
        )
        .catch((error) => {
          messageDispatch({ type: 'SET', payload: error.response.data.error })
          setTimeout(() => {
            messageDispatch({ type: 'SET', payload: null })
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userLogged = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(userLogged),
      )
      blogService.setToken(userLogged.token)
      userDispatch({ type: 'SET', payload: userLogged })
      setUsername('')
      setPassword('')
      console.log('usuario logueado', user)
    } catch (exception) {
      messageDispatch({ type: 'SET', payload: 'Wrong credentials' })
      setTimeout(() => {
        messageDispatch({ type: 'SET', payload: null })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'SET', payload: null })
    setUsername('')
    setPassword('')
    setLoginVisible(false)
    messageDispatch({ type: 'SET', payload: 'Logout successful' })
    setTimeout(() => {
      messageDispatch({ type: 'SET', payload: null })
    }, 5000)
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
      <Notification message={message} />
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
