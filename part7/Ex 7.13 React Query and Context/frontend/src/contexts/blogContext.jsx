import { createContext, useContext, useReducer } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload.sort((a, b) => b.likes - a.likes)
    case 'APPEND':
      return [...state, action.payload].sort((a, b) => b.likes - a.likes)
    case 'LIKE':
      return state
        .map((blog) => (action.payload.id !== blog.id ? blog : action.payload))
        .sort((a, b) => b.likes - a.likes)
    case 'DELETE':
      return state
        .filter((blog) => blog.id !== action.payload)
        .sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

const BlogsContext = createContext()

export const useBlogsValue = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[0]
}

export const useBlogsDispatch = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[1]
}

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext
