import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewData, setViewData] = useState(false)

  return(
    viewData ? 
      <div className="blog">
          <p>{blog.title} </p>
          <p>{blog.url} </p>
          <p>Likes: {blog.likes} </p>
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