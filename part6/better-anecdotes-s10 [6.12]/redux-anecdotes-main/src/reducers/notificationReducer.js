import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Initial Notification',
    reducers: {
      notificationChange(state, action) {
        //console.log('statehere', current(state))
        //console.log('stateinFC', state)
        return action.payload
      },
    },
  })

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer