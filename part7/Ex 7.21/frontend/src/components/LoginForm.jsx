import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useState, useEffect } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              data-testid="password"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm
