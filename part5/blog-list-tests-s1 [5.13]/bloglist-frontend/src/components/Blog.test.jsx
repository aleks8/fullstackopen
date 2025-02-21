import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testingauthor',
    url: 'testingurl',
    likes: 'testinglikes',
    //user: newLikesBlogUserId
    //content: 'Component testing is done with react-testing-library',
    //important: true
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library testingauthor')
  expect(element).toBeDefined()
})