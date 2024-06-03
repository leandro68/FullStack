const PersonLine = ({personList}) => {

  return (
    <p>{personList.map(person => 
      <li key={person.id}>
        {person.name} {person.phone}
      </li>)}
    </p>
  )
}

const PersonList = ({show}) => {
  return (
    <ul>
        <PersonLine personList={show}/>
    </ul>
  )
}

export default PersonList