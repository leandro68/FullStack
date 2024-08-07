import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdote = () => {
  
  const dispatch = useDispatch()

  const addAnecdote = ( event ) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(newAnecdote( content ))
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