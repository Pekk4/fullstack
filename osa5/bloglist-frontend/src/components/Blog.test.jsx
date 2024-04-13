import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('extended content renders after clicking the button', async () => {
  const blog = {
    title: 'Mergehelvetistä itään',
    author: 'M. Luukkainen',
    url: 'https://example.com',
    likes: 666,
    user: {
      username: 'Voldemort',
      name: 'T. Valedro'
    }
  }
  const appUser = { ... blog.user }

  render(<Blog blog={blog} user={appUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined()
  expect(screen.getByText(`Likes ${blog.likes}`)).toBeDefined()
  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(appUser.name)).toBeDefined()
})
