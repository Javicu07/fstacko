import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const utils = render(<Note note={note} />)

  utils.screen.getByText('This is a test')
  utils.screen.getByText('make not important')

  // Another way to do the same before
  // expect(utils.container).toHaveTextContent(note.content)
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mockHandler = jest.fn() // 'mockHandler' watch the calls to event 'click'

  const utils = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = utils.screen.getByText('make not important')
  fireEvent.click(button) // Throw a event 'click' on 'button'

  expect(mockHandler).toHaveBeenCalledTimes(1)
  // expect(mockHandler.mock.calls).toHaveLength(1) // the same before
})