//const { test, after } = require('node:test')
const { test, after, beforeEach } = require('node:test')

const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

/*const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]*/

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

//test.only is an option 
test('blogs are returned as json', async () => {
  console.log('entered test')

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 
        helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]
  //console.log('blogToView',blogToView)
  const resultBlog = await api    
    .get(`/api/blogs/${blogToView.id}`)    
    .expect(200)    
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/', 
    //likes: 4, 
  }
  /*title: String,
  author: String,
  url: String,
  likes: Number*/
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()  
  assert.strictEqual(blogsAtEnd.length, 
      helper.initialBlogs.length + 1)
    
      //const response = await api.get('/api/blogs')

  //const contents = response.body.map(r => r.content)
  const contents = blogsAtEnd.map(b => b.title)
  //assert.strictEqual(response.body.length, initialBlogs.length + 1)
  //console.log('blogsAtEnd',blogsAtEnd)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('likes will be 0 if add a blog without likes', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/', 
    //likes: 4, 
  }
  /*title: String,
  author: String,
  url: String,
  likes: Number*/
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()  
  assert.strictEqual(blogsAtEnd.length, 
      helper.initialBlogs.length + 1)
    
      //const response = await api.get('/api/blogs')

  //const contents = response.body.map(r => r.content)
  const contents = blogsAtEnd.map(b => b.title)
  //assert.strictEqual(response.body.length, initialBlogs.length + 1)
  const newLikesBlog = blogsAtEnd.find(((blog) => blog.title === "async/await simplifies making async calls"))
  const newLikes = newLikesBlog.likes 
  //console.log('blogsAtEnd',blogsAtEnd)
  //console.log('newlikes',newLikes)
  assert.strictEqual(newLikes, 0)
  //assert(contents.includes('async/await simplifies making async calls'))
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/', 
    likes: 4, 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  //console.log('blogsAtEnd',blogsAtEnd)
  //const response = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  //assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Martin Fowler',
    likes: 4, 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  //console.log('blogsAtEnd',blogsAtEnd)
  //const response = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  //assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api    
    .delete(`/api/blogs/${blogToDelete.id}`)    
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.id)
  assert(!contents.includes(blogToDelete.id))
  //console.log('contents',contents)
  //console.log('blogsAtEnd',blogsAtEnd)
  //console.log('blogToDelete',blogToDelete)
  //console.log('helper.initialBlogs.length - 1', helper.initialBlogs.length - 1)
  //console.log('blogsAtEnd.length', blogsAtEnd.length)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test.only('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  //const blogToUpdate = blogsAtStart.find((blog) => blog.id === '5a422a851b54a676234d17f7')
  const blogToUpdate = {
    id: '5a422a851b54a676234d17f7',
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 17,
  }
  //console.log('blogToUpdate',blogToUpdate)
  await api    
    .put(`/api/blogs/${blogToUpdate.id}`)   
    .send(blogToUpdate) 
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.id)
  //console.log('blogsAtEnd', blogsAtEnd)
  const updatedBlogAtEnd = blogsAtEnd.find(((blog) => blog.title === "React patterns"))
  const updatedBlogNewLikes = updatedBlogAtEnd.likes 
  //console.log('updatedBlogAtEnd',updatedBlogAtEnd)
  //console.log('updatedBlogNewLikes',updatedBlogNewLikes)
  assert.strictEqual(updatedBlogNewLikes, 17)
  //assert(!contents.includes(blogToUpdate.id))
  //console.log('contents',contents)
  //console.log('blogsAtEnd',blogsAtEnd)
  //console.log('blogToDelete',blogToDelete)
  //console.log('helper.initialBlogs.length - 1', helper.initialBlogs.length - 1)
  //console.log('blogsAtEnd.length', blogsAtEnd.length)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})
/*
test('blog without content is not added', async () => {
    const newBlog = {
      important: true
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    //const response = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    //assert.strictEqual(response.body.length, initialBlogs.length)
  })
*/
/*test('a valid blog can be added ', async () => {
    const newBlog = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()  
        assert.strictEqual(blogsAtEnd.length, 
        helper.initialBlogs.length + 1)
      
        //const response = await api.get('/api/blogs')
  
    //const contents = response.body.map(r => r.content)
    const contents = blogsAtEnd.map(b => b.content)
    //assert.strictEqual(response.body.length, initialBlogs.length + 1)
    
    assert(contents.includes('async/await simplifies making async calls'))
  })

*/

/*
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.content)
  
    assert(contents.includes('Browser can execute only JavaScript'))
  })


test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api    
      .delete(`/api/blogs/${blogToDelete.id}`)    
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
  
    const contents = blogsAtEnd.map(r => r.content)
    assert(!contents.includes(blogToDelete.content))
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.content)
    //assert.strictEqual(contents.includes('HTML is easy'), true)
    //simplified with below
    // is the argument truthy
    assert(contents.includes('HTML is easy'))
  })
*/
after(async () => {
  await mongoose.connection.close()
})