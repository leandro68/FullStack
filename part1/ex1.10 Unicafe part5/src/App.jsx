import { useState } from "react";

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({text, value, symbol}) => {
  return (
    <p>{text} {value}{symbol}</p>
  )
}

const Statistic = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <StatisticLine text="No feedback given"/>;
  } else {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad)/all} />
        <StatisticLine text="positive" value={good / all} symbol="%" />
      </div>
    );
  }
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Title text="statistics" />
      <Statistic good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
