import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import Todo from './Todo'

const newTodo = {
  text: 'Get some beer',
  done: false
}
const doneTodo = {
  text: 'Get more beer',
  done: true
}

describe('Todo component', () => {
  test('renders todo text correctly', () => {
    render(<Todo todo={newTodo} deleteTodo={() => {}} completeTodo={() => {}} />)

    expect(screen.getByText(newTodo.text)).toBeDefined()
    expect(screen.getByText('This todo is not done')).toBeDefined()
  })

  test('renders done todo correctly', () => {
    render(<Todo todo={doneTodo} deleteTodo={() => {}} completeTodo={() => {}} />)

    expect(screen.getByText(doneTodo.text)).toBeDefined()
    expect(screen.getByText('This todo is done')).toBeDefined()
  })

  test('delete button calls deleteTodo handler', async () => {
    const mockHandler = vi.fn()

    render(<Todo todo={newTodo} deleteTodo={mockHandler} completeTodo={() => {}} />)

    const user = userEvent.setup()
    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('done button calls completeTodo handler', async () => {
    const mockHandler = vi.fn()

    render(<Todo todo={newTodo} deleteTodo={() => {}} completeTodo={mockHandler} />)

    const user = userEvent.setup()
    const doneButton = screen.getByText('Set as done')
    await user.click(doneButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
