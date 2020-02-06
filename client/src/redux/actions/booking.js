import axios from "axios";
import {
    BOOKING_SUCCESS,
    GETBOOKINGBYID_SUCCESS,
    GETBOOKINGBYID_FAIL,
    CANCLEBOOKING_SUCCESS,
    GETBOOKINGQUEUE_SUCCESS,
    GETBOOKINGQUEUE_FAIL,
    BOOKINGACCEPT_SUCCESFULL

} from './types';
import { setAlert } from './alert'
import store from '../store';

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
// @desc get queued bikes of service center
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

// @Access admin
// @desc accept queued bikes of service center
export const acceptQueue = (bikeID) => async dispatch => {
    try {

        // Initialize an array to save selected id and servicing date
        const acceptedBookings = []
        // get queued bike details from store
        const queuedbike = store.getState().booking.queueDetails

        // map through all the queued bikes 
        queuedbike.map(item => {
            // map selected bike ids 
            bikeID.map((bikeid, i) => {
                // get servicing date of selected bikes from store
                if (bikeid == item.bike._id) {
                    // add every obj to array
                    let obj = {}
                    obj.id = item.bike._id
                    obj.servicingDate = item.servicingDate
                    acceptedBookings[i] = obj
                }
            })
        })

        const body = { acceptedBookings }

        const res = await axios.post('/booking/accept', body)

        console.log('Response from backend')
        console.log(res.data.payload)

        dispatch({
            type: BOOKINGACCEPT_SUCCESFULL,
            payload: res.data.payload,
            msg: res.data.msg
        })

        // dispatch(setAlert('Profile updated successfully', 'success'))


    } catch (err) {

        // dispatch(setAlert('Servicing adding failed', 'danger'))
    }
}