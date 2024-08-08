import { useSelector } from 'react-redux'
import User from './User'
import { useState } from 'react'
import LoginForm from './LoginForm'
import Logout from './Logout'

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
          <Logout />
          <h1>Users</h1>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <>
                {users.map((user) => (
                  <User key={user.id} user={user} />
                ))}
              </>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
