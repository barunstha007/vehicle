import axios from "axios";
import {
    GETSERVICECENTER_SUCCESS,
    GETSERVICECENTER_FAIL,
    SERVICECENTER_ADD_SUCCESS,
    // SERVICECENTER_ADD_FAIL,
    SERVICECENTER_UPDATE_SUCCESS,
    SERVICECENTER_UPDATE_FAIL,
    SERVICECENTER_DELETE_SUCCESS,
    // SERVICECENTER_DELETE_FAIL,
    UPDATEVACANTADMIN_SUCCESS,
    UPDATE_ASSIGNED_ADMIN_SUCCESS
} from './types';
import { setAlert } from './alert'

// Get all service center
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

// Add service center
export const addServiceCenter = (serviceCenterDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {

        // POST for registration, with req.body
        const res = await axios.post('/service-center', serviceCenterDetails, config)

        dispatch({
            type: SERVICECENTER_ADD_SUCCESS,
            payload: res.data
        })

        // Update dropdown admin list
        dispatch({
            type: UPDATEVACANTADMIN_SUCCESS,
            payload: res.data.admin
        })

        dispatch(setAlert('Service Center Added Successfully', 'success'))

    } catch (err) {
        dispatch(setAlert('Some error adding service center', 'danger'))
    }
}

// Update service center
export const updateServiceCenter = (serviceCenterDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {

        // POST for registration, with req.body
        const res = await axios.post('/service-center/update', serviceCenterDetails, config)

        dispatch({
            type: SERVICECENTER_UPDATE_SUCCESS,
            payload: serviceCenterDetails
        })

        // Update dropdown admin list
        dispatch({
            type: UPDATEVACANTADMIN_SUCCESS,
            payload: serviceCenterDetails.admin
        })

        dispatch(setAlert(res.data, 'success'))

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: SERVICECENTER_UPDATE_FAIL
        })
    }
}

// Delete service center
export const deleteServiceCenter = (serviceCenterID) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify userdetails
    const id = serviceCenterID._id

    try {

        // DELETE service center
        const res = await axios.delete('/service-center/' + id)

        dispatch(setAlert(res.data, 'success'))

        // delete from list
        dispatch({
            type: SERVICECENTER_DELETE_SUCCESS,
            payload: id
        })

        dispatch({
            type: UPDATE_ASSIGNED_ADMIN_SUCCESS,
            payload: serviceCenterID.admin
        })




    } catch (err) {
        dispatch(setAlert(err, 'danger'))

    }
}
