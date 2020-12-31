const initialState = {
  message: '',
  isError: false
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'MSG_CREATE':
      return action.data
    case 'MSG_CLEAR':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, isError, durationInSec) => {
  return dispatch => {
    dispatch({
      type: 'MSG_CREATE',
      data: {
        message,
        isError
      }
    })
    setTimeout(
      () => dispatch({type: 'MSG_CLEAR'}),
      durationInSec * 1000
    )
    
  }
}

export default notificationReducer