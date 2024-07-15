import { useState } from 'react'


const Blog = ({ updateBlogLikes, removeBlog, blog }) => {
  const [viewData, setViewData] = useState(false)

  return(
    viewData ?
      <div className="blog">
        <div className="blogTitle-container" data-testid="blogTitle">
          <p>{blog.title}, {blog.author}</p>
          <button className="viewButton" onClick={() => setViewData(false)}>hide</button>
        </div>
        <p className='url-container' data-testid="blogUrl">{blog.url} </p>
        <div className="likes-container" data-testid="blogLikes">
          <p>Likes: {blog.likes} </p>
          <button className="viewButton" onClick={updateBlogLikes} data-testid="blogLikeButton">Like</button>
        </div>
        <p>{ blog.user.name }</p>
        <button className="removeButton" onClick={removeBlog} data-testid="deleteBlog">Remove</button>
      </div>
      :

      <div className="blog">
        <p>{blog.title}, {blog.author}</p>
        <button className="viewButton" onClick={() => setViewData(true)}>view</button>
      </div>
  )

}


export default Blog