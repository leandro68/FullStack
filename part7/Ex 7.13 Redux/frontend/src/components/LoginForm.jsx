import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
