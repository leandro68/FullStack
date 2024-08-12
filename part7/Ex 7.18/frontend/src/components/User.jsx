import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = user.blogs.map((blog) => blog.id.toString())
  console.log('userBlogs', userBlogs)
  const userBlogsData = blogs.filter((blog) => userBlogs.includes(blog.id))
  console.log('userBlogData', userBlogsData)
  return (
    <>
      {userBlogsData.map((blog) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </>
  )
}

export default User
