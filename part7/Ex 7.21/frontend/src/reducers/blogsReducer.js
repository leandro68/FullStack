import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const newBlogs = action.payload.sort((a, b) => b.likes - a.likes)
      return newBlogs
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogsSlice.actions
export default blogsSlice.reducer
