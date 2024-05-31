const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  let total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
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

const Courses = ({courses}) => {
  return(
    <>
      { courses.map((course => <Course key={course.id} course={course}/>)) }
    </> 
  )
  
}

export default Courses;