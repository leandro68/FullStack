import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'
import Logout from './components/Logout'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  // RENDER --------------------------------------------------
  const user = useSelector((state) => state.user)

  return (
    <div>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link className="link-menu" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link className="link-menu" to="/users">
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user !== null && (
                  <div className="logout-section">
                    <Logout />
                  </div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
