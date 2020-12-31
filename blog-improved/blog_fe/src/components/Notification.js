import React from 'react'
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
    <div>
      <div id='note' style={isError ? styleError : styleMessage}><h3>{message}</h3></div>
    </div>)
  )
}

export default Notification