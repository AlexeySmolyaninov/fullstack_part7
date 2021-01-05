import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisible}>{props.buttonLabelOpen}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='danger' onClick={toggleVisible}>{props.buttonLabelClose}</Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabelOpen: PropTypes.string.isRequired,
  buttonLabelClose: PropTypes.string.isRequired
}

export default Togglable