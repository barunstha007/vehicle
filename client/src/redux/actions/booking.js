import axios from "axios";
import {
    BOOKING_SUCCESS,
    GETBOOKINGBYID_SUCCESS,
    GETBOOKINGBYID_FAIL,
    CANCLEBOOKING_SUCCESS,
    GETBOOKINGQUEUE_SUCCESS,
    GETBOOKINGQUEUE_FAIL

} from './types';
import { setAlert } from './alert'

// @Access customers
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

// @Access customers
// request for booking
export const bookServicing = (serviceCenter, bikeDetails, bookingStatus) => async dispatch => {

    const body = { serviceCenter, bikeDetails, bookingStatus }
    // console.log(body)
    try {
        const res = await axios.post('/booking/request', body)
        console.log(res.data)

        if (res.status == 400)
            dispatch(setAlert(res.error[0].msg, 'danger'))
        else {
            dispatch({
                type: BOOKING_SUCCESS,
                payload: res.data
            })

            dispatch(setAlert('Booking Successful', 'success'))
        }


    } catch (err) {
        const errors = err.response.data
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors.error[0].msg, 'danger'))

        }

    }
}

// @Access customers
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

// @Access admin
// @desc get queued 
export const getQueue = () => async dispatch => {

    try {
        const res = await axios.get('/booking/queue')
        // console.log(res.data)
        dispatch({
            type: GETBOOKINGQUEUE_SUCCESS,
            payload: res.data
        })

    } catch (err) {

        dispatch({
            type: GETBOOKINGQUEUE_FAIL
        })
    }
}