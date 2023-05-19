import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders text', () => {
  const todo = {
    text: 'Increase the number of tools in my toolbelt',
    done: false
  }
  const mockDelete = jest.fn();
  const mockComplete = jest.fn();

  render(<Todo todo={todo} onClickDelete={mockDelete} onClickComplete={mockComplete}/>)

  expect(screen.getByText('Increase the number of tools in my toolbelt')).toBeInTheDocument()
})
