import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  
  const dispatch = useDispatch()
  
  const addAnecdote = async ( event ) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`you voted '${content}'`, 5000))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </>
    
  )
}

export default NewAnecdote