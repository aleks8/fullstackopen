import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADDED_ANECDOTE":
        return action.payload
    case "VOTED":
        return action.payload 
    case "CLEAR_NOTIFICATION":
        return 'Add anedote or vote'
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 'Add anecdote or vote')
//{props} 
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  console.log('NandD1', notificationAndDispatch)
  //console.log('NandD0', notificationAndDispatch[0])
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  //console.log('NandD1', notificationAndDispatch[1])
  console.log('NandD2', notificationAndDispatch)
  return notificationAndDispatch[1]
}
/*
export const setNotification = (notification, timeOutLength) => {  
  return async dispatch => {  
      dispatch(notification)
      setTimeout(() => {
          dispatch('Add an anecdote or vote')
      }, timeOutLength*1000)
      
  }
}*/
export default NotificationContext