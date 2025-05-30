const mongoose = require('mongoose')
/*
name: String!
    id: ID!
    born: String
    bookCount: Int!
*/
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)