import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"

const NewAnecdote = () => {
  
  const dispatch = useDispatch()

  const showNotification = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  
  const addAnecdote = async ( event ) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdot = await anecdoteService.createNew(content)
    dispatch(newAnecdote( newAnecdot ))
    showNotification(`Added: ${content}`)
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