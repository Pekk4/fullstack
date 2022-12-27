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
  const sum = Object.values(statistics).reduce((a, b) => a + b)
  const good = statistics["Good"]
  const bad = statistics["Bad"]
  const results = [<Header text="Statistics" />]

  statistics["Average"] = (good + (-1 * bad)) / sum
  statistics["Percentage"] = (good / sum) * 100

  if (sum > 0) {
    for (const [key, value] of Object.entries(statistics)) {
      if (key === "Percentage") {
        results.push(<Display text={key} count={value} end_char="%" />)
      } else {
        results.push(<Display text={key} count={value} />)
      }
    }
  } else {
    results.push(<p>No feedback given</p>)
  }

  return results
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = {
    "Good": good,
    "Neutral": neutral,
    "Bad": bad
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App;
