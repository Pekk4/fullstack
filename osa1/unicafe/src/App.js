import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ text, count, end_char }) => (
  <p>{text}: {count} {end_char}</p>
)

const Statistics = ({ statistics }) => {
  const [good, neutral, bad] = statistics
  const sum = statistics.reduce((a, b) => a + b)
  const average = (good + (-1 * bad)) / sum
  const percentage = (good / sum) * 100

  return (
    <>
      <Display text="Good" count={good} />
      <Display text="Neutral" count={neutral} />
      <Display text="Bad" count={bad} />
      <Display text="All" count={sum} />
      <Display text="Average" count={average} />
      <Display text="Positive" count={percentage} end_char="%" />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = [good, neutral, bad]

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Header text="Statistics" />
      <Statistics statistics={statistics} />
    </div>
  )

}

export default App;
