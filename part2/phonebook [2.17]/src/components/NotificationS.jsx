const NotificationS = ( {message} ) => {
    if (message === null) {
      return null
    }
  //"error"
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  
  export default NotificationS