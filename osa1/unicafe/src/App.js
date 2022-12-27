import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, count, end_char }) => (
  <tr>
    <td>{text}</td><td>{count} {end_char}</td>
  </tr>
)

const Statistics = ({ statistics }) => {
  const sum = Object.values(statistics).reduce((a, b) => a + b)
  const good = statistics["Good"]
  const bad = statistics["Bad"]
  const results = []

  statistics["All"] = sum
  statistics["Average"] = ((good - bad) / sum).toFixed(1)
  statistics["Positive"] = ((good / sum) * 100).toFixed(1)

  if (sum > 0) {
    for (const [key, value] of Object.entries(statistics)) {
      if (key === "Positive") {
        results.push(<StatisticLine key={key} text={key} count={value} end_char="%" />)
      } else {
        results.push(<StatisticLine key={key} text={key} count={value} />)
      }
    }
  } else {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        {results}
      </tbody>
    </table>
  )
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
      <Header text="Statistics" />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App;
