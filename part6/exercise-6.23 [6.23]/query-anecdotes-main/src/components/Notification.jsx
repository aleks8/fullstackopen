import { useContext, useState } from "react"
import {useNotificationValue} from '../NotificationContext'

const Notification = ({notificationDisplay}) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
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
  return (
    <div style={style}>
      {notificationDisplay}
    </div>
  )
}

export default Notification
