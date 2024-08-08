import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useState, useEffect } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const showLoginButton = { display: loginVisible ? 'none' : '' }
  const showLoginForm = { display: loginVisible ? '' : 'none' }

  useEffect(() => {
    if (user === null) {
      setUsername('')
      setPassword('')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const logedUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(logedUser)
      )
      blogService.setToken(logedUser.token)
      dispatch(setUser(logedUser))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login to Blogapp</h2>
      <div style={showLoginButton}>
        <button onClick={() => setLoginVisible(true)}>Log in</button>
      </div>
      <div style={showLoginForm}>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm
