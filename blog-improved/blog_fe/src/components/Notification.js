import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'


const mainStyle = {
  border: '2px solid black',
  borderRadius: '5px',
  padding: '0.5%',
  color: 'white',
  textAlign: 'center'
}
const styleError = {
  ...mainStyle,
  backgroundColor: 'red'
}

const styleMessage = {
  ...mainStyle,
  backgroundColor: 'green'
}

const Notification = () => {
  const {message, isError} = useSelector(state => state.notification)

  return (
    (message && 
    <Alert variant={isError ? 'danger': 'success'}>
      <h3>{message}</h3>
    </Alert>)
  )
}

export default Notification