import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Country from './components/Country'
import Notification from './components/Notification'

const App = () => {
  const [textSearched, setTextSearched] = useState('')
  const [countriesFounded, setCountriesFounded] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [message, setMessage] = useState(null)

   
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
    setQuantity(totalCountries.length)
    setCountriesFounded(totalCountries) 
    if (totalCountries.length === 0){
      setMessage(
        `There are no countries`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }  
    if (totalCountries.length > 10){
      setMessage(
        `More than 10 countries`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }  
  }

  const showDetails = (event) => {
    const totalCountries = allCountries.filter(country => (country.ccn3 === event.value))
    setQuantity(totalCountries.length)
    setCountriesFounded(totalCountries)  
  }

  useEffect(() => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => setAllCountries(response.data))
    }, [])

  return (
    <div>
      <Filter value={textSearched} onChange={handleTextSearched}/>
      <Notification message={message} />
      <ul>
         {countriesFounded.map((country, id) => 
            <Country key={id} country={country} quantity={quantity} showDetails={showDetails}/>
         )}
      </ul>   
    </div>
  )
}

export default App






