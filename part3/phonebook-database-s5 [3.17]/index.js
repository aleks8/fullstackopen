//3.13
require('dotenv').config()

const express = require('express')
const app = express()
//3.13
const Person = require('./models/person')
//added this for 3.7
var morgan = require('morgan')
const cors = require('cors')

//3.16 - the order of these app.use
app.use(express.static('dist'))


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
//
morgan.token('body', function (req, res) 
{ return JSON.stringify(req.body) })
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
/*const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}*/
/*
app.get('/', function (req, res) {
  res.send('hello, world!')
})*/

//added function and removed the arrow for 3.7 so morgan can log to console
//did this for all of the app.___ 
app.get('/', function (request, response) {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/info', function (request, response) {
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

app.get('/api/persons', function(request, response)  {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    //response.json(persons)
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
  
//3.14 - post
app.post('/api/persons', function(request, response, next)  {
  const body = request.body
  //const isTaken = persons.find(p => p.name === body.name)

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
  const person1 = new Person({
    name: body.name,
    number: body.number,
    //id: String(getRandomIntInclusive(Number(generateId()),1000)),
  })
  Person.find({name: body.name})
    .then(person => {
      if(person[0] !== undefined) {
        console.log('person1',person)
        console.log('person_id',JSON.stringify(person[0]._id))
        const id = JSON.stringify(person[0]._id)
        //app.put('/api/persons/:'+person[0]._id, (request, response, person[0]._id, next) => {
        //one of the 3.17 answers with a POST command instead of PUT 
          const body = request.body
        
          const person2 = {
            name: body.name,
            number: body.number,
          }
        
          Person.findByIdAndUpdate(person[0]._id, person2, { new: true })
            .then(updatedPerson => {
              console.log(updatedPerson)
              response.json(updatedPerson)
            })
            .catch(error => next(error))
        //})
        /*
        Person.findByIdAndUpdate(id, person1)//, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))*/
      }
      else {
        console.log('notTaken')
        person1.save().then(savedPerson => {
          response.json(savedPerson)
        })
      }
    })
  })
    //alternative 3.17 answer with a PUT request instead of POST 
  app.put('/api/persons/:id', (request, response, next) => {
      const body = request.body
    
      const person2 = {
        name: body.name,
        number: body.number,
      }
    
      Person.findByIdAndUpdate(request.params.id, person2, { new: true })
        .then(updatedPerson => {
          console.log(updatedPerson)
          response.json(updatedPerson)
        })
        .catch(error => next(error))
      })
    //})
  /*Person.find(body.name)) 
    .then(person => {
      if (person) {     
        Person.findByIdAndUpdate(person.id, person, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))
        // })   
        //response.json(person) 

    /*} else {        
      response.status(404).end()      
    }
  }*/
  /*if (isTaken) {
    return response.status(400).json({ 
      error: 'name already exists in the phonebook' 
    })
  }*/
    
  
  
  //persons = persons.concat(person)
    
  //response.json(person)
  

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
//3.14 - get
app.get('/api/persons/:id', function(request, response, next)  {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {        
      response.json(person)      
    } else {        
      response.status(404).end()      
    }
    //response.json(person)
  })
  .catch(error => 
    next(error))  
    //console.log(error)      
    //response.status(400).send({ error: 'malformatted id' })   
  
  /*
  const id = request.params.id
  const person = persons.find(p => p.id === id)
    if (person) {
      response.json(person)
    } else {
      console.log('x')
      response.status(404).end()
    }*/
  })
/*different answer*/
//3.15 answer 
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    //3.16 
    .catch(error => next(error))
  
  })

app.use(unknownEndpoint)
//3.16
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

//app.use(errorHandler)

const PORT = process.env.PORT //|| 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

 /*
const mongoose = require('mongoose')

const password = process.argv[2]

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
//const url =
const url = process.env.MONGODB_URI;
  //`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
//console.log('url',url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})*/
/*let persons = [
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
]*/
/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
*/
