import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post('/users', body, config)
    } catch (err) {

    }
}