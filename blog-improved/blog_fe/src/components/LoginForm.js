import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({
  handleUser
}) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginFormOnSubmit = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      handleUser(user)
    } catch(exception) {
      dispatch(setNotification(
        'Failed to login! Check username and password',
        true,
        3
      ))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form id='login' onSubmit={handleLoginFormOnSubmit}>
        <div>
          <label>Username</label>
          <input
            id='username'
            type='text'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          <label>password</label>
          <input
            id='password'
            type='password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default LoginForm