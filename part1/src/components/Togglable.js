// 'forwardRef' is a method that when come a prop 'ref' up the correct value upside the program

// 'useImperativeHandle' it´s a react hook used to define functions into a component that can invoke
//  from outside the component itself. No change his value if you don´t indicate with the dependencies

import React, {forwardRef, useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'  // It´s necessary 'npm install prop-types'. Not included in React
import i18n from '../i18n/index'

// 'forwardRef' receive the 'props' and the 'ref'
// 'forwardRef' must involve the React Component
// '{buttonLabel}' has a default value, 'show'. This is the correct way to default values in functional components
const Togglable = forwardRef(({children, buttonLabel = 'show'}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  // the result of the function saves into 'ref'
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility  // 'toggleVisibility' is accesible from out the component
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {i18n.TOGGABLE.CANCEL_BUTTON}
        </button>
      </div>

    </div>
    )
})

Togglable.displayName = 'Togglable'

// This is only for information, not conduces to error
Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable