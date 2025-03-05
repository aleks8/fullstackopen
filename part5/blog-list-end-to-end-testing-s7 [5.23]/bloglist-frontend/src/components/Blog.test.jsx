import { render, screen } from '@testing-library/react'
//import { useState, useEffect } from 'react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testingauthor',
    url: 'testingurl',
    likes: 'testinglikes',
    user: '67a969a1a984f0ce0b582e55'
    //user: newLikesBlogUserId
    //content: 'Component testing is done with react-testing-library',
    //important: true
  }

  render(<Blog blog={blog}/>)

  //screen.debug()
  

  const element = screen.getByText('Component testing is done with react-testing-library testingauthor')
  //screen.debug(element)
  expect(element).toBeDefined()
  /* alternaive way to do the above 
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')  
  expect(div).toHaveTextContent(    
    'Component testing is done with react-testing-library testingauthor'  
  )
  */
})

test('clicking view shows the url and number of likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testingauthor',
    url: 'testingurl',
    likes: '7',
    user: '67a969a1a984f0ce0b582e55'
    //content: 'Component testing is done with react-testing-library',
    //important: true
  }
  const loggedUserName = 'Matti Luukkainen'
  //const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  //const loggeduser = JSON.parse(loggedUserJSON)
  //'Matti Luukkainen'
  //console.log('loggeduser.name', loggeduser)
  //const mockHandler = vi.fn()
  //addBlogVisible={false} setAddBlogVisible={mockHandler}
  render(
    <Blog blog={blog} loggedUserName={loggedUserName}/>  )

  //screen.debug()
  //screen.debug()
  const user = userEvent.setup()  
  const button = screen.getByText('view')  
  //console.log('BUTTON')
  //screen.debug(button)
  await user.click(button)
  //screen.debug()
  //screen.debug()
  //console.log('mockHandler',mockHandler.mock.calls)
        //screen.debug()
        /*const button2 = screen.getByText('hide')
        console.log('BUTTON2')
        screen.debug(button2)
        await user.click(button2)*/
  //expect(mockHandler.mock.calls).toHaveLength(1)
  const element = screen.getByText(
    'Component testing is done with react-testing-library testingauthor testingurl likes 7')
  expect(element).toBeDefined()
})

test('if like button clicked 2x event handler called 2x', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testingauthor',
    url: 'testingurl',
    likes: '7',
    user: '67a969a1a984f0ce0b582e55'
    //content: 'Component testing is done with react-testing-library',
    //important: true
  }

  const loggedUserName = 'Matti Luukkainen'
  //const setAddBlogVisibleMH = vi.fn()
  //render(
  //  <Blog blog={blog} loggedUserName={loggedUserName}/>  )

  

  //const element = screen.getByText(
   // 'Component testing is done with react-testing-library testingauthor testingurl likes 7')
  //expect(element).toBeDefined()
//allBlogs={blogs}allBlogs={blogs}newLikesBlogUserId={blog.user}
  const mockHandler = vi.fn() 
  //const onLikeMock = vi.fn()
  render(
    <Blog blog={blog} changeLikes={mockHandler}
    loggedUserName={loggedUserName}  />  )
  //const user2 = userEvent.setup()  
  //screen.debug()

  const user = userEvent.setup()  
  const button = screen.getByText('view')  
  //console.log('BUTTONhere')
  //screen.debug(button)
  await user.click(button)
  //screen.debug()
  const button2 = screen.getByText('like') 
  await user.click(button2)
  await user.click(button2)
  //screen.debug(button2)
  //console.log('mockHandlercalls',mockHandler.mock.calls)
  //console.log('mockHandler',mockHandler.toHaveBeenCalledTimes)
  //expect(onLikeMock).toHaveBeenCalledTimes(2)
  //expect(setAddBlogVisibleMH).toHaveBeenCalledTimes(1)
  //expect(changeLikesMH).toHaveBeenCalledTimes(2)
  //const user2 = userEvent.setup()  
  //const button2 = screen.getByText('like') 
  //await user2.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(mockHandler).toHaveBeenCalledTimes(2)
  //expect(changeLikesMH.mock.calls).toHaveLength(2)

 
})


  /*const blogs = blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )  
  console.log('blogs', blogs)*/
  //this will probably get an error because I don't have blogs, setblogs?
  //this seems incorrect 
  /*const [blogs, setBlogs] = useState([])
  useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }, [])*/
  //const allBlogs = await api.get('/api/blogs')
  /*const allBlogs = {
    title: 'Component testing is done with react-testing-library',
    author: 'testingauthor',
    url: 'testingurl',
    likes: '7',
    user: '67a969a1a984f0ce0b582e55'
  }*/