import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'
import Logout from './components/Logout'
import { useSelector } from 'react-redux'

const App = () => {
  // RENDER --------------------------------------------------
  const user = useSelector((state) => state.user)

  return (
    <div>
      <Router>
        <div className="menu-bar">
          <Link className="link-menu" to="/">
            Home
          </Link>
          <Link className="link-menu" to="/users">
            Users
          </Link>
          {user !== null && (
            <div className="logout-section">
              <Logout />
            </div>
          )}
        </div>

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
