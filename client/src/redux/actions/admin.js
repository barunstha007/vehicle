import axios from "axios";
import {
    SERVICECENTER_ADD_SUCCESS,
    SERVICECENTER_ADD_FAIL,

    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL,
    ASSIGNSERVICECENTER_SUCCESS,
    ASSIGNSERVICECENTER_FAIL
} from './types';
import { setAlert } from './alert'

export const vacantAdminList = () => async dispatch => {

    try {
        const res = await axios.get('/admin')

        dispatch({
            type: GETVACANTADMIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GETVACANTADMIN_FAIL
        })
    }
}

export const assignServiceCenter = (id, assignedServiceCenter) => async dispatch => {

    const body = { id, assignedServiceCenter }

    try {
        const res = await axios.post('/admin/assignServiceCenter', body)

        dispatch({
            type: ASSIGNSERVICECENTER_SUCCESS,
            payload: res.data
        })

        console.log('Action=> AssignServiceCenterSuccess')
        console.log(res.data)

    } catch (err) {
        console.log(err)
        dispatch({
            type: ASSIGNSERVICECENTER_FAIL
        })
    }
}

// Update service center
export const addAdmin = (serviceCenterDetails) => async dispatch => {
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
