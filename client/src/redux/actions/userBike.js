import axios from "axios";
import {
    GETBIKE_SUCCESS,
    GETBIKE_FAIL,
    BIKE_ADDORUPDATE_SUCCESS,
    BIKE_ADDORUPDATE_FAIL
} from './types';
import { setAlert } from './alert'

export const getUserBike = () => async dispatch => {

    try {
        const res = await axios.get('/mybike')
        // console.log(res.data)

        dispatch({
            type: GETBIKE_SUCCESS,
            payload: res.data
        })


    } catch (err) {

        // dispatch(setAlert('Some Error when getting user bike', 'danger'))


        dispatch({
            type: GETBIKE_FAIL
        })
    }
}

export const addOrUpdatebike = (bikeDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify bikeDetails
    const body = JSON.stringify(bikeDetails)

    try {

        // POST for registration, with req.body
        const res = await axios.post('/mybike/addorupdate', body, config)

        dispatch({
            type: BIKE_ADDORUPDATE_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Bike changes successful', 'success'))


    } catch (err) {
        const errors = err.response.data
        if (errors)
            dispatch(setAlert(errors.error[0].msg, 'danger'))

        dispatch({
            type: BIKE_ADDORUPDATE_FAIL
        })
    }
}

