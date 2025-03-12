import { useContext, useState } from "react"
import {useNotificationValue} from '../NotificationContext'

const Notification = () => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notificationValue = useNotificationValue()
  console.log('NOTIFICATIONHERE', notificationValue)
  /*const notificationValue = useNotificationValue()
  console.log('notificationValue', notificationValue)
  //if (true) return null
  if (!notificationValue) {
    return (
      <div style={style}>
       Add anecdote or vote 
    </div>
    )
  }*/
  
//{notification}
  //{notificationDisplay}
  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
