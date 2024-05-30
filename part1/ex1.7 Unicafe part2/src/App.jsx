import { useState } from 'react'

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

const Total =({text, total, symbol}) => {
  return (
    <div>
      <p>{text} {total}{symbol}</p>
    </div>
    
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
      setGood(good+1)
      setAll(all+1)
  }

  const handleNeutral = () => {
      setNeutral(neutral+1)
      setAll(all+1)
  }

  const handleBad = () => {
      setBad(bad+1)
      setAll(all+1)
  }


  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
      <Title text="statistics" />
      <Total text="good" total={good}/>
      <Total text="neutral" total={neutral}/>
      <Total text="bad" total={bad}/>
      <Total text="all" total={all}/>
      <Total text="average" total={(good - bad) / all}/>
      <Total text="positive" total={good / all} symbol="%"/>
    </div>
  )
}

export default App





