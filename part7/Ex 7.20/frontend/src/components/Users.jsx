import { useSelector } from 'react-redux'
import User from './User'
import { useState } from 'react'
import LoginForm from './LoginForm'
import Logout from './Logout'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = useState(null)
  const user = useSelector((state) => state.user)
  console.log('user en User component', user)

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1>Users</h1>
          <Table striped>
            <thead>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {
                        <Link to={`/users/${user.id}`} id={user.id}>
                          {user.username}
                        </Link>
                      }
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Users
