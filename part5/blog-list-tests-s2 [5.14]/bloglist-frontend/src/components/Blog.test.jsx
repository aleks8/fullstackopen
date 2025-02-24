import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  render(<Blog blog={blog} />)

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
  //const mockHandler = vi.fn() onClick={mockHandler}
  render(
    <Blog blog={blog}  loggedUserName={loggedUserName}/>  )

  //screen.debug()

  const user = userEvent.setup()  
  const button = screen.getByText('view')  
  //console.log('BUTTON')
  //screen.debug(button)
  await user.click(button)
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
