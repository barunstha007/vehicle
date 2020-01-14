import axios from "axios";
import {
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    GETBOOKINGBYID_SUCCESS,
    GETBOOKINGBYID_FAIL,
    CANCLEBOOKING_SUCCESS,

} from './types';
import { setAlert } from './alert'

export const getBooking = () => async dispatch => {

    try {
        const res = await axios.get('/booking/:id')
        // console.log(res.data)
        dispatch({
            type: GETBOOKINGBYID_SUCCESS,
            payload: res.data
        })


    } catch (err) {

        dispatch({
            type: GETBOOKINGBYID_FAIL
        })
    }
}

// request for booking
export const bookServicing = (serviceCenter, bikeDetails, bookingStatus) => async dispatch => {

    const body = { serviceCenter, bikeDetails, bookingStatus }
    // console.log(body)
    try {
        const res = await axios.post('/booking/request', body)
        console.log(res.data)

        dispatch({
            type: BOOKING_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Booking Successful', 'success'))


    } catch (err) {
        const errors = err.response.data
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors.error[0].msg, 'danger'))

        }

    }
}

export const cancleServicing = (bikeDetails) => async dispatch => {

    const body = { bikeDetails }
    // console.log(body)
    try {
        const res = await axios.post('/booking/cancle', body)
        console.log(res.data)

        dispatch({
            type: CANCLEBOOKING_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Cancel Successful', 'success'))


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors, 'danger'))

        }

    }
}
