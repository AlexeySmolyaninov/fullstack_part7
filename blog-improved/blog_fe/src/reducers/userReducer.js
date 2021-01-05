import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('user')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export const setUserFromLocalStorage = (user) => {
  return dispatch => {
    const jsonUser = window.localStorage.getItem('user')
    if(jsonUser){
      dispatch({
        type: 'SET_USER',
        data: JSON.parse(jsonUser)
      })
    }
  }
} 

export default userReducer