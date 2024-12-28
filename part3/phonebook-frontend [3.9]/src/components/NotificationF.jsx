const NotificationF = ( {message} ) => {
    if (message === null) {
      return null
    }
  //"error"
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
  export default NotificationF