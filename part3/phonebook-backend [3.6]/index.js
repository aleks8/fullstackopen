const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/info', (request, response) => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(p => p.id))
  : 0
  //console.log(response.headers(200, {'Date': }))
  //not sure how to fix this 
  const date = new Date()
  /*const formattedDate = date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Helsinki',
    timeZoneName: 'long'
  });*/
  const formatdate = date.toUTCString()
  //const strdate = JSON.stringify(date)
    response.send('<p>Phonebook has info for '+maxId+' people</p>'+
      '<p>'+formatdate+'+0200 (Eastern European Standard Time)</p>'
    )
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
 
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return String(maxId + 1)
  }

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
    // The maximum is inclusive and the minimum is inclusive
  }
  
app.post('/api/persons', (request, response) => {
  const body = request.body
  const isTaken = persons.find(p => p.name === body.name)

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (isTaken) {
    return response.status(400).json({ 
      error: 'name already exists in the phonebook' 
    })
  }
    
  const person = {
    name: body.name,
    number: body.number,
    id: String(getRandomIntInclusive(Number(generateId()),1000)),
  }

  persons = persons.concat(person)
    
  response.json(person)
  })

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
    if (person) {
      response.json(person)
    } else {
      console.log('x')
      response.status(404).end()
    }
  })
/*different answer*/
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
    
  response.status(204).end()
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })