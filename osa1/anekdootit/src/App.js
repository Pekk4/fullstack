import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Paragraph = ({ content }) => (
  <p>
    {content}
  </p>
)

const Header = ({ text }) => (
  <h1>
    {text}
  </h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const length = anecdotes.length
  const [points, setPoints] = useState(new Array(length).fill(0))
  const copybara = [...points]

  copybara[selected] += 1

  const getTopIndex = (array) => {
    const max = Math.max(...array)
    const index = array.indexOf(max)
  
    return index
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Paragraph content={anecdotes[selected]} />
      <Paragraph content={"Has " + points[selected] + " points"} />
      <Button handleClick={() => setPoints(copybara)} text="Vote this anecdote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * length))} text="Generate anecdote" />
      <Header text="Anecdote with most votes" />
      <Paragraph content={anecdotes[getTopIndex(points)]} />
    </div>
    
  )
}

export default App
