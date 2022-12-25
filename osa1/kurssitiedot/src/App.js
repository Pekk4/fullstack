const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.exercises.reduce((a, b) => a + b, 0)}</p>
)

const Content = (props) => (
  props.parts.map((part, i) => <Part part={part} exercise={props.exercises[i]} />)
)

const App = () => {
  const course = 'Half Stack application development'
  const exercises = [10, 7, 14]
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </>
  )
}

export default App
