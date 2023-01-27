const Total = (props) => (
    <p>
      Number of exercises {props.course.parts.map(part => part.exercises).reduce((a, b) => a + b)}
    </p>
  )
