const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to phonebook app</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                 <br/>
                 <p>${Date()}</p>`)
})

app.get('/api/persons/:id', ( request, response ) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', ( request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number){
    console.log('name or phone missing')
    return response.status(400).json({error: 'name or phone missing'})
  }

  if (persons.find(person => person.name === body.name)){
    console.log('name must be unique')
    return response.status(400).json({error: 'name must be unique'})
  }

  const person = {
    id: Math.floor(Math.random()*10e16),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Phonebook app listen on port 3001')
})
