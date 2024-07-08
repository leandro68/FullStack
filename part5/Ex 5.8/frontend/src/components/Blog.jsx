import { useState } from 'react'


const Blog = ({ updateBlogLikes, blog }) => {
  const [viewData, setViewData] = useState(false)

  return(
    viewData ? 
      <div className="blog">
          <p>{blog.title} </p>
          <p>{blog.url} </p>
          <div className="likes-container">
            <p>Likes: {blog.likes} </p>
            <button className="viewButton" onClick={updateBlogLikes}>Like</button>
          </div>
          <p>{blog.author} </p>
        <button className="viewButton" onClick={() => setViewData(false)}>hide</button>
      </div> 
      : 
      <div className="blog">
        {blog.title} 
        <button className="viewButton" onClick={() => setViewData(true)}>view</button>
      </div> 
  )
   

}
  

export default Blog