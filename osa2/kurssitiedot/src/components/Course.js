import Content from './Content'

const Header = (props) => {
    const { course } = props.course

    return <h1>{course.name}</h1>
}

const Total = (props) => {
    const { course } = props.course

    return (
        <h4>
            Number of exercises {course.parts.map(part => part.exercises).reduce((a, b) => a + b)}
        </h4>
    )
}

const Course = (course) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course
