import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests/requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext, "")

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type:'SHOW', payload:`You add: ${newAnecdote.content}` })
      setTimeout(() => notificationDispatch({ type:'HIDE'}), 5000)
    },
    onError: () => {
      notificationDispatch({ type:'SHOW', payload:`Error when trying to add anecdote, must be 5 characters length or more` })
      setTimeout(() => notificationDispatch({ type:'HIDE'}), 5000)
    }
  })
  
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
