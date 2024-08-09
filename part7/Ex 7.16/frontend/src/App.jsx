import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  // RENDER --------------------------------------------------

  return (
    <div>
      <Router>
        <div>
          <Link className="link-menu" to="/">
            Home
          </Link>
          <Link className="link-menu" to="/users">
            Users
          </Link>
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
