import  { useState } from 'react'

const BlogForm = ({ createBlog, handleAddBlog, blogFormVisible }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showButton, setShowButton ] = useState(blogFormVisible)

  
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      { blogFormVisible ? 
          <div>
            <form onSubmit={addBlog}>
            <div>
              <label>title: </label>
              <input
                value={newTitle}
                onChange={event => setNewTitle(event.target.value)}
              />
            </div>
            <div>
              <label>author: </label>
              <input
                value={newAuthor}
                onChange={event => setNewAuthor(event.target.value)}
              />
            </div>
            <div>
              <label>url: </label>
              <input
                value={newUrl}
                onChange={event => setNewUrl(event.target.value)}
              />
            </div>
            <br />
            <button type="submit">Save</button>
            <br />
          </form> 
          <button onClick={()=>handleAddBlog(!blogFormVisible)}>Cancel</button>
        </div>
        :
        <div>
          <button onClick={()=>handleAddBlog(!blogFormVisible)}>Add Blog</button>
        </div>
      }
    </div>
  )
}

export default BlogForm