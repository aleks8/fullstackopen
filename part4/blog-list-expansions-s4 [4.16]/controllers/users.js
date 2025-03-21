const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  /*if (!password || password.length <= 3) {
    response.status(400).json(password)
  }*/
  if (!password) { //} || password.length <= 3) {
    response.status(400).json({error: 'password missing'})
  }
  if (password.length <= 3) {
    response.status(400).json({error: 'password too short'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  /*if (!password || password.length <= 3) {
    response.status(400).json(savedUser)
  }*/
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User    
        .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1
    })
    //const users = await User.find({})
    response.json(users)
  })

module.exports = usersRouter