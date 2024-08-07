import { useSelector } from 'react-redux'
import User from './User'

const UsersList = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        <>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </>
      </table>
    </div>
  )
}

export default UsersList
