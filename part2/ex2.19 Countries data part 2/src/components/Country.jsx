const Country = ({ country, quantity, showDetails }) => {

  if ((quantity <= 10) && (quantity > 1)) {
    return (
      //<p>{country.name.common}</p>
      <li>{country.name.common} <button value={country.ccn3} onClick={showDetails}> show </button></li>
    )
    
  } else if (quantity === 1){
      let languages = Object.values(country.languages).map(value => value)
      //console.log('lenguages',countries[0].languages,languages)
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <br/>
          <h2>Languages:</h2>
          <ul>
            {languages.map((lang, id) =>
            <li key={id}>{lang}</li>
            )}
          </ul>
          <img src={country.flags.png} alt='country flag' />
        </div> 
      )
   } else {
      return 
    }
}

export default Country