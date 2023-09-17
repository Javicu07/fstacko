import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'
import i18n from '../i18n/index'

describe('<Toggable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel={buttonLabel}>
        <div>testDivContent</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.screen.getByText('testDivContent')
  })

  test('renders its children but they are not visible', () => {
    const el = component.screen.getByText('testDivContent')
    expect(el.parentNode).not.toBeVisible()
  })

  test('after clicking its children must be shown', () => {
    const button = component.screen.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.screen.getByText('testDivContent')
    expect(el.parentNode).toBeVisible()
  })

  test('toggled content can be closed', () => {
    const button = component.screen.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.screen.getByText('testDivContent')
    expect(el.parentNode).toBeVisible()

    const cancelButton = component.screen.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    expect(el.parentNode).not.toBeVisible()
  })
})