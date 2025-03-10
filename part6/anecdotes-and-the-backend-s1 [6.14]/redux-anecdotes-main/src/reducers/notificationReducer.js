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
      setNotification(state, action) {
        return action.payload
      },
      removeNotification(state, action) {
        return action.payload
      }
    },
  })

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer