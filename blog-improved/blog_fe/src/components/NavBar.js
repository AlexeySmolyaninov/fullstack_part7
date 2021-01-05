import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {loginUser, logoutUser} from '../reducers/userReducer'

const navBarStyle = {
  padding: '5px'
}

const padding = {
  padding: 5
}

const NavBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/login')
  }
  return(
    <Navbar bg='dark' variant='dark'>
      <Nav className='mr-auto'>
        <Nav.Link><Link style={padding} to='/blogs'>blogs</Link></Nav.Link>
        <Nav.Link><Link style={padding} to='/users'>users</Link></Nav.Link>
        {user ?
        <em style={{color: 'white', padding: '5px'}}>{user.name} logged in <button onClick={handleLogout}>logout</button></em> :
        <Nav.Link><Link style={padding} to='/login'>login</Link></Nav.Link>}
      </Nav>
      
    </Navbar>
  )
}

export default NavBar