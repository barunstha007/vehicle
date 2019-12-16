import axios from "axios";
import {
    GETSERVICECENTER_SUCCESS,
    GETSERVICECENTER_FAIL,
    SERVICECENTER_ADD_SUCCESS,
    SERVICECENTER_ADD_FAIL
} from './types';
import { setAlert } from './alert'

export const serviceCenterList = () => async dispatch => {

    try {
        const res = await axios.get('/service-center')

        dispatch({
            type: GETSERVICECENTER_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GETSERVICECENTER_FAIL
        })
    }
}

// Update service center
export const addServiceCenter = (serviceCenterDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify userdetails
    const body = JSON.stringify(serviceCenterDetails)

    try {
        // POST for registration, with req.body
        const res = await axios.post('/register', body, config)
        console.log(res.data);

        dispatch({
            type: SERVICECENTER_ADD_SUCCESS,
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
            type: SERVICECENTER_ADD_FAIL
        })
    }
}
