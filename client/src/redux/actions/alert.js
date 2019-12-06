import { SET_ALERT, REMOVE_ALERT } from './types'
import uuid from 'react-uuid'

// Can use setAlert() where we want alert for some event
// ACTION CREATOR
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid()

    // Tell reducer the type of action called eg: SET_ALERT
    dispatch({
        // ACTION
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() =>
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        }), 2500)
}