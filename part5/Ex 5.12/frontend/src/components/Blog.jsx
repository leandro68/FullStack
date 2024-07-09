import { useState } from 'react'


const Blog = ({ updateBlogLikes, removeBlog, blog }) => {
  const [viewData, setViewData] = useState(false)

  return(
    viewData ? 
      <div className="blog">
        <div className="blogTitle-container">
          <p>{blog.title} </p>
          <button className="viewButton" onClick={() => setViewData(false)}>hide</button> 
        </div>
        <p>{blog.url} </p>
        <div className="likes-container">
          <p>Likes: {blog.likes} </p>
          <button className="viewButton" onClick={updateBlogLikes}>Like</button>
        </div>
        <p>{blog.author} </p>
        <button className="removeButton" onClick={removeBlog}>Remove</button>
      </div> 
      : 
      <div className="blog">
        {blog.title} 
        <button className="viewButton" onClick={() => setViewData(true)}>view</button>
      </div> 
  )
   

}
  

export default Blog