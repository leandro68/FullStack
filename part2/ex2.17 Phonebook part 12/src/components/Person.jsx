const Person = ({onSubmitPerson,  
                 onChangeName,
                 valueName,
                 onChangePhone,
                 valuePhone}) => {
  
  return (
    <form onSubmit={onSubmitPerson}>
      <div>
        name: <input value={valueName} onChange={onChangeName}/>
      </div>
      <div>
        phone: <input value={valuePhone} onChange={onChangePhone}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Person