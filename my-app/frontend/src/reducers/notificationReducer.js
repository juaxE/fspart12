import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: initialState, type: initialState },
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
    }
})


export const { setMessage } = notificationSlice.actions

export const setNotification = (message, type, timer) => {
    return async dispatch => {
        dispatch(setMessage({ message: message, type: type }))
        setTimeout(() => {
            dispatch(setMessage({ message: initialState, type: initialState }))
        }, timer * 1000)
    }
}

export default notificationSlice.reducer