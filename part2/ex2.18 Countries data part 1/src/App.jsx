import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [textSearched, setTextSearched] = useState('')
  const [countriesFounded, setCountriesFounded] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [quantity, setQuantity] = useState(0)

  const handleTextSearched = (event) => {
    event.preventDefault()
    //console.log(allCountries[0].name.common)
    const text = event.target.value
    setTextSearched(event.target.value)
    //console.log('text',text)
    let totalCountries = []
    const toShow = (text === '') ?
      setCountriesFounded([]) :
      totalCountries = allCountries.filter(country => 
            {if (country.name && country.name.common) {
              return country.name.common.toLowerCase().includes(text.toLowerCase());
            } else {
            return [];
            }})
    setCountriesFounded(totalCountries)       
    setQuantity(totalCountries.length)
  }

  useEffect(() => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => setAllCountries(response.data))
    }, [])

  return (
    <div>
      <Filter value={textSearched} onChange={handleTextSearched}/>
      <Country countries={countriesFounded} quantity={quantity} />      
    </div>
  )
}

export default App






