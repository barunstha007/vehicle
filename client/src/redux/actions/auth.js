import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'
import { setAlert } from './alert'
// Register User
export const register = (userDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify userdetails
    const body = JSON.stringify(userDetails)

    try {
        // POST for registration
        const res = await axios.post('/register', body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            // get token from response
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}