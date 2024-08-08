import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, actions) {
      return actions.payload
    },
    addUserBlog(state, actions) {
      return state.map((user) =>
        user.id === actions.payload.user.id
          ? [...user, user.blogs.push(actions.payload.blog.id)]
          : user
      )
    },
  },
})

export const { setUsers, addUserBlog } = usersSlice.actions
export default usersSlice.reducer
