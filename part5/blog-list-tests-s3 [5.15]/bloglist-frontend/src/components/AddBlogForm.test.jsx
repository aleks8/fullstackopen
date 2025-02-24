import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('<AddBlogForm /> updates parent state and calls onSubmit',  () => {
  const createBlog = vi.fn()
  //const user = userEvent.setup()

  render(<AddBlogForm createBlog={createBlog} />)

  //const input = screen.getByRole('textbox')
  //const inputs = screen.getAllByRole('textbox')

  //await user.type(inputs[0], 'testing a form...')
  const input = screen.getByPlaceholderText('write title here')
  const sendButton = screen.getByText('create')

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)
  //console.log(createNote.mock.calls)

  //expect(createBlog.mock.calls).toHaveLength(1)
  //expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')

})