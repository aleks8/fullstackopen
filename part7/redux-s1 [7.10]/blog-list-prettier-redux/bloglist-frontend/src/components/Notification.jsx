import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
      return state.notification
      })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === null) {
    return null;
  }
  if(notification.includes('added')) {
    return <div className="success">{notification}</div>;
  }
  /*<div style={style}>
      {notification}
    </div>*/
  return (
     <div className="error">{notification}</div>
  )
}

export default Notification

/*
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes('added')) {
    return <div className="success">{message}</div>;
  }
  return <div className="error">{message}</div>;
};

export default Notification;*/
