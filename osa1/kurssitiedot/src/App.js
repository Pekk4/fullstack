import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Content = (props) => {
  let results = [];

  for (let i = 0; i < props.parts.length; i++) {
    results.push(<Part part={props.parts[i]} exercise={props.exercises[i]} />)
  }

  return (
    <>
      {results[0]}
      {results[1]}
      {results[2]}
    </>
  )
}

const Total = (props) => {
  let sum = 0;

  for(let i = 0; i < props.exercises.length; i++) {
      sum += props.exercises[i];
  }

  return (
      <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ]
  const exercises = [
    10,
    7,
    14
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App
