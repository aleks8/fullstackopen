import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      changeNotification(state, action) {
        return action.payload
      },
      removeNotification(state, action) {
        return action.payload
      }
    },
  })

export const { changeNotification, removeNotification } = notificationSlice.actions


export const setNotification = (notification, timeOutLength) => {  
    return async dispatch => {  
        dispatch(changeNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification(null))
        }, timeOutLength*1000)
        
    }
}

export default notificationSlice.reducer