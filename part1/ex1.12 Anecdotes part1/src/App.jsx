import { useState } from 'react'


const Anecdote = ({text}) => {
  return (
    <p>{text}</p>
  )
}

const Button = ({handleClick}) => {
  return (
    <button onClick={handleClick}>next Anecodote</button>
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

  //save anecdote index selected
  const [selected, setSelected] = useState(0)

  //random generator
  function newRandom(max) {
    return Math.floor(Math.random() * max);
  }

  //set new anecdote index selected
  const handleSelected = () => {
    const indexSelected = newRandom(anecdotes.length)
    setSelected(indexSelected)
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <Button handleClick={handleSelected} />
    </div>
  )
}

export default App
