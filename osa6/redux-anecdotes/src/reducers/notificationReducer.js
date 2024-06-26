import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch(createNotification(content))

    setTimeout(() => {
      dispatch(createNotification(''))
    }, seconds * 1000);
  }
}

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer
