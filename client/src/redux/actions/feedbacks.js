import { setAlert } from './alert'
import axios from "axios";

// admin
export const getFeedback = () => async dispatch => {
    try {

        const res = await axios.post('/feedback/:id')

        dispatch({
            type: 'GET_FEEDBACK',
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.error
        dispatch(setAlert(errors[0].msg, 'danger'))
    }
}
// client
export const sendFeedback = (sc, vote, msg) => async dispatch => {
    try {
        const body = { sc, vote, msg }

        const res = await axios.post('/feedback/post', body)

        console.log(res.data)
        dispatch(setAlert('Feedback sent', 'success'))

    } catch (err) {
        const errors = err.response.data.error
        dispatch(setAlert(errors[0].msg, 'danger'))
    }
}



