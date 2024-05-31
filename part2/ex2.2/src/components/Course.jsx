const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  let total = 0
  parts.map(part => total += part.exercises)
  return (
    <p>Total of {total} exercises</p>
  )
  
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
       {parts.map((part => <Part key={part.id} part={part} />))}
    </> 
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    
  )
}

export default Course;