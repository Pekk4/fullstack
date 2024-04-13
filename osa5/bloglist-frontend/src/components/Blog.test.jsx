import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Mergehelvetistä itään',
    author: 'M. Luukkainen'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
})
