const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const middleware = require('../utils/middleware')
//const jwt = require('jsonwebtoken')

/*const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) 
    {    
      return authorization.replace('Bearer ', '')  
    }  
    return null
  }*/

   
blogsRouter.get('/:id', async (request, response) => {
  const token = request.token 
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

//blogsRouter.delete('/:id', async (request, response) => {
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id) 
  /*const decodedToken = jwt.verify(request.token, 
    process.env.SECRET)  
    //console.log('decodedToken', decodedToken)
    if (!decodedToken.id) {   
      //console.log('decodedToken3', decodedToken) 
      return response.status(401).json({ 
        error: 'token invalid' })  
    }  
  const user = await User.findById(decodedToken.id)*/
  
  const token = request.token 
  const user = request.user
  //console.log('requestbody', request)
  //console.log('token1',token)
  //console.log('user1',user)
  const userid = user.id
  if ( blog.user.toString() === userid.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ 
      error: 'token and user invalid' })  
  }
  //await Blog.findByIdAndDelete()
  
})

blogsRouter.get('/', async (request, response) => {
  //const user = request.user 
  //this below is part of 4.17
  const token = request.token 
  const user = request.user
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
  /*Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })*/
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0 ,
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  })

//blogsRouter.post('/', async (request, response) => {
  blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    //console.log('decodedToken1', jwt.verify(request.token, 
    //  process.env.SECRET)  )
    //console.log('request.token', request.token)
    /*const decodedToken = jwt.verify(request.token, 
    process.env.SECRET)  
    //console.log('decodedToken', decodedToken)
    if (!decodedToken.id) {   
      //console.log('decodedToken3', decodedToken) 
      return response.status(401).json({ 
        error: 'token invalid' })  
    }  
    const user = await User.findById(decodedToken.id)*/
    const token = request.token
    const user = request.user
    //console.log('user2',user)
    //console.log('tokenpost', token)
    //const user = await User.findById(body.user)
    /*title: String,
    author: String,
    url: String,
    likes: Number*/
    
    //const usersAtStart = await helper.usersInDb()
    //const userOneAtStart = usersAtStart[0]
    //console.log('userOneAtStart', userOneAtStart)

    const blog = new Blog({
      title: body.title,
      author: body.author,// || false,
      url: body.url, 
      likes: body.likes || 0,
      user: user.id //|| userOneAtStart.id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)  
    await user.save()

    //response.status(201).json(savedBlog)
    response.status(201).json(savedBlog)
  })  
    /*blog
      .save()
      .then(savedBlog => {
        response.status(201).json(savedBlog)
      })
      .catch(error => next(error))*/
  //})

/*blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })*/

module.exports = blogsRouter