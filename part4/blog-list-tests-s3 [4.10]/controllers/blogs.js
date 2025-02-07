const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
/*
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
*/
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  /*Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })*/
  })

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    /*title: String,
    author: String,
    url: String,
    likes: Number*/
    const blog = new Blog({
      title: body.title,
      author: body.author,// || false,
      url: body.url, 
      likes: body.likes,
    })
  
    const savedBlog = await blog.save()
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