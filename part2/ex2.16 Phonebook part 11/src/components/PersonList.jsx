const PersonList= ({person, deletePerson}) => {

  return (
    <li>
        {person.name} {person.phone}
        <button onClick={deletePerson}>delete</button>
    </li>)
}


export default PersonList