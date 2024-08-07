const User = ({ user }) => {
  console.log(user)
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User
