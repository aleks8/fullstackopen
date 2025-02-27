import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  //const user = userEvent.setup()

  render(<AddBlogForm createBlog={createBlog} />)

  //const input = screen.getByRole('textbox')
  //const inputs = screen.getAllByRole('textbox')

  //await user.type(inputs[0], 'testing a form...')
   
  const newTitle = screen.getByPlaceholderText('write title here')
  //console.log('input', input)
  const newAuthor = screen.getByPlaceholderText('write author here')
  const newUrl = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(newTitle, 'Test Blog')
  await user.type(newAuthor, 'Test Author')
  await user.type(newUrl, 'www.testurl.com')
  //userEvent.type(author, 'testing a author form...')
  //userEvent.type(url, 'testing a url form...')
  
  //userEvent.type(input, 'testing a author form...')
  //userEvent.type(input, 'testing a url form...')
  //userEvent.click(sendButton)
  await user.click(sendButton)
  //console.log(sendButton)
  //console.log('createBlog', createBlog)
  //console.log('createBlog.mock.calls', createBlog.mock.calls)
  //console.log('createBlog.mock.calls[0][0]', createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.testurl.com'
  })
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')

})