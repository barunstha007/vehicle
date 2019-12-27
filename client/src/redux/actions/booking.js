import axios from "axios";
import {
    GETBOOKING_SUCCESS,
    GETBOOKING_FAIL,
} from './types';
import { setAlert } from './alert'

export const getBooking = () => async dispatch => {

    try {
        const res = await axios.get('/booking')
        // console.log(res.data)

        dispatch({
            type: GETBOOKING_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETBOOKING_FAIL
        })
    }
}

export const applyBooking = (bookingDetails) => async dispatch => {

    try {
        const res = await axios.post('/booking/' + bookingDetails)
        console.log(res.data)

        // dispatch({
        //     type: UPDATEPROFILE_SUCCESS,
        //     payload: res.data
        // })

        // dispatch(setAlert('Profile updated successfully', 'success'))


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors, 'danger'))

        }
        dispatch({
            type: GETPROFILE_FAIL
        })
    }
}
