import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote} from './requests/requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext, "")

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type:'SHOW', payload:`You vote for ${anecdote.content}` })
    setTimeout(() => notificationDispatch({ type:'HIDE'}), 5000)
    console.log('vote:',notification)
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data
 

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification not={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
