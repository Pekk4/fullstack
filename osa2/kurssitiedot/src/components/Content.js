const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Content = (props) => {
  const { course } = props.course

  return course.parts.map(part => <Part part={part.name} exercise={part.exercises} />)
}

export default Content
