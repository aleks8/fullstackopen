const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://allie8888:${password}@cluster0.rf62c.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
  //`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log('sresult',result)
    console.log('added '+person.name+' number '+person.number+' to phonebook')
    mongoose.connection.close()
  })
}
if(!(process.argv[3])) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(''+person.name+' '+person.number)
    })
    mongoose.connection.close()
  })
}
/*
const person = new Person({
  name: 'Jack Poulous',
  number: '11-77-99-33-44',
})*/


/*
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
  */