const Header = ({ name }) => <h1>{name}</h1>

/*const Total = ({ sum }) => <p>Number of exercises {sum}</p>*/

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
    </div>
    
  )
}

export default Course;