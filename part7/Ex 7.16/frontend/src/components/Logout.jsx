/* eslint-disable semi */
/* prettier-ignore */
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    dispatch(setNotification('Logout successful'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    navigate('/')
    //dispatch(setBlogs(blogs))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          handleLogout()
        }}
      >
        logout
      </button>
    </div>
  )
}

export default Logout
