import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user ? state.user : null)

  const handleLoginFormOnSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    .then(() => history.push('/blogs'))
    .catch(e => dispatch(setNotification(
      'Failed to login! Check username and password',
      true,
      3
    )))
  }

  if(user){
    return (
      <div>
        <h1>Hello {user.name}</h1>
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form id='login' onSubmit={handleLoginFormOnSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}/>
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}/>
        </Form.Group>
        <button type='submit'>Log in</button>
      </Form>
    </div>
  )
}

export default LoginForm