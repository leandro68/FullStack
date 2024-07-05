import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogFormVisible(false)
        console.log(returnedBlog)
        setMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
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
    setMessage(`Logout successful`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleAddBlog = (event) => {
    (blogFormVisible) ? setBlogFormVisible(false) : setBlogFormVisible(true)
  }

  const loginForm = () => {
    const showLoginButton = {display: loginVisible ? 'none' : ''}
    const showLoginForm = {display: loginVisible ? '' : 'none'}

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
      { user === null ?
        <div>
          <h1>Log in to application</h1>
          {loginForm()} 
        </div> 
      :
        <div>
          <h1>Blogs</h1>
          <div>
            <p>{user.name} logged-in</p>
            <button onClick={() => handleLogout()}>logout</button>
          </div>
          <BlogForm createBlog={addBlog} 
                    handleAddBlog={handleAddBlog}
                    blogFormVisible={blogFormVisible}/>
        </div>
      }
      <div>  
        
        
        <ul>
          {blogs.map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App