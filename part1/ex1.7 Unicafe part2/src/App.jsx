import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePerc, setPositivePerc] = useState(0)
  const pointsGood = 1
  const pointsBad = -1

  const handleGood = () => {
      const total = all + 1
      const goodTotal = good + 1
      setGood( good + 1 )
      setAll( all + 1 )
      setAverage( (goodTotal * pointsGood + bad * pointsBad) / total )
      setPositivePerc( goodTotal / total )
  }

  const handleNeutral = () => {
      const total = all + 1
      setNeutral( neutral+1 )
      setAll( all + 1 )
      setAverage( ((good * pointsGood) + (bad * pointsBad)) / total )
      setPositivePerc( good / total )
  }

  const handleBad = () => {
      const total = all + 1
      const badTotal = bad + 1
      setBad( bad+1 )
      setAll( all + 1 )
      setAverage( ( good * pointsGood + badTotal * pointsBad ) / total )
      setPositivePerc( good / total )
  }

  const Title = ({text}) => {
    return (
      <h1>{text}</h1>
    )
  }

  const Button = ({text, handleClick}) => {
    return (
      <button onClick={handleClick}>{text}</button>
    )
  }

  const Total =({text, state, symbol}) => {
    return (
        <div>
          <p>{text} {state} {symbol}</p>
        </div>
    )
  }

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
      <Title text="statistics" />
      <Total text="good" state={good}/>
      <Total text="neutral" state={neutral}/>
      <Total text="bad" state={bad}/>
      <Total text="all" state={all}/>
      <Total text="average" state={average}/>
      <Total text="positive" state={positivePerc} symbol="%"/>
    </div>
  )
}

export default App





