const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  const part1 = {
    name: props.parts[0].name,
    exercises: props.parts[0].exercises,
  }
  const part2 = {
    name: props.parts[1].name,
    exercises: props.parts[1].exercises,
  }
  const part3 = {
    name: props.parts[2].name,
    exercises: props.parts[2].exercises,
  }
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </>
  )
}

const Total = (props) => {
  const e1 = props.parts[0].exercises
  const e2 = props.parts[1].exercises
  const e3 = props.parts[2].exercises
  return (
    <>
      <p>Number of exercises {e1 + e2 + e3}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App