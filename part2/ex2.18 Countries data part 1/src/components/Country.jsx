const Country = ({ countries, quantity }) => {

  if ((quantity <= 10) && (quantity > 1)) {
    //console.log('less than 10')  
    return (
      //<p>{country.name.common}</p>
      <ul>
         {countries.map((country, id) =>
           <li key={id}>{country.name.common}</li>
         )}
      </ul>
    )
    
  } else if (quantity === 1){
      //console.log('one country founded',)
      let languages = Object.values(countries[0].languages).map(value => value)
      //console.log('lenguages',countries[0].languages,languages)
      return (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>capital: {countries[0].capital}</p>
          <p>area: {countries[0].area}</p>
          <br/>
          <h2>Languages:</h2>
          <ul>
            {languages.map((lang, id) =>
            <li key={id}>{lang}</li>
            )}
          </ul>
          <img src={countries[0].flags.png} alt='country flag' />
        </div> 
      )
    
  } else if (quantity > 10) {
      //console.log('sea mas especifico')
      return <h2>Please, be more specific</h2>
  
  } else {
      //console.log('zero countries')
      return <h2>No country was founded</h2>
    }
}

export default Country