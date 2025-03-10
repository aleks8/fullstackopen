import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Add an anecdote or vote',
    reducers: {
      /*notificationChange(state, action) {
        //console.log('statehere', current(state))
        //console.log('stateinFC', state)
        return action.payload
      },*/

      //part of 6.19 answer 
      changeNotification(state, action) {
        //console.log('notification.action.payload', action.payload)
        return action.payload
      },
      removeNotification(state, action) {
        return action.payload
      }
    },
  })

export const { changeNotification, removeNotification } = notificationSlice.actions

//part of 6.19 answer 
export const setNotification = (notification, timeOutLength) => {  
    return async dispatch => {  
        dispatch(changeNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification('Add an anecdote or vote'))
        }, timeOutLength*1000)
        
    }
  /*  return async dispatch => {   
    //console.log('anecdoteshere', anecdotes) 
    //const anecdotes = await anecdoteService.getAll() 
    //const voteToChange = anecdotes.find(a => a.id === id)
    const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
    await anecdoteService.updateVotes(id, changedVote)    
    dispatch(incrementAnecdote(id))  
  }*/
}

export default notificationSlice.reducer