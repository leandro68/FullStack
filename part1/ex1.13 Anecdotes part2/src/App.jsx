import { useState } from 'react'


const Anecdote = ({text}) => {
  return (
    <p>{text}</p>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const VotesPerAnecdote = ({anecdoteVotes}) => {
  return (
    <p>Has {anecdoteVotes} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //array with votes per anecdote
  const votes = Array.from({ length: anecdotes.length }, () => 0)
  console.log(votes)
 
  //save anecdote index selected
  const [selected, setSelected] = useState(0)
  const [votesList, setVote] = useState(votes)

  //random generator
  function newRandom(max) {
    return Math.floor(Math.random() * max);
  }

  //set the array of votes state
  const handleVote = () => {
    const newVotesList = [].concat(votesList)
    newVotesList[selected] += 1
    setVote(newVotesList)
  }

  //set new anecdote index selected state
  const handleSelected = () => {
    const indexSelected = newRandom(anecdotes.length)
    setSelected(indexSelected)
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      {console.log(votesList)}
      <VotesPerAnecdote anecdoteVotes={votesList[selected]}/>
      <Button text="vote" handleClick={handleVote} />
      <Button text="next Anecodote" handleClick={handleSelected} />
    </div>
  )
}

export default App
