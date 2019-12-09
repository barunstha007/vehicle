import axios from "axios";
import uuid from 'react-uuid'

// Can use setAlert() where we want alert for some event
// ACTION CREATOR
export const register = (userData) => {
    const id = uuid()

    // Tell reducer the type of action called eg: SET_ALERT
    return dispatch => {

        return axios.post('/register', userData)

    }
}