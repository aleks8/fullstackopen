import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
      /* something here */
     /*if(state.notification === '') {
          return state.notification
      }*/
      return state.notification
      //return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) ) //=== true

      //return state.anecdotes
      })
    
  /* 
  this is 5 seconds 
  setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
  */

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification