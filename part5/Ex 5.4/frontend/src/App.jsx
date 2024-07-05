import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setMessage(`A new blog "${newTitle}" by ${newAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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
    setMessage(`Logout successful`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username : 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password : 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      <br />
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>title: </label>
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>author: </label>
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label>url: </label>
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <br />
      <button type="submit">save</button>
      <br />
    </form>  
  )
  

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
          
          {blogForm()}
          
          <ul>
            {blogs.map(blog => 
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App