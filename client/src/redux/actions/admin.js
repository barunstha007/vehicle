import axios from "axios";
import {
    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL,
    ASSIGNSERVICECENTER_SUCCESS,
    ASSIGNSERVICECENTER_FAIL,
    GETADMIN_SUCCESS,
    GETADMIN_FAIL,
    ADMIN_ADD_SUCCESS,
    ADMIN_ADD_FAIL,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_FAIL,
    UPDATEADMIN_SUCCESS,
    UPDATEADMIN_FAIL
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

export const getAdmin = () => async dispatch => {

    try {
        const res = await axios.get('/admin/all')

        dispatch({
            type: GETADMIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETADMIN_FAIL
        })
    }
}

export const addAdmin = (adminDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify admindetails
    const body = JSON.stringify(adminDetails)

    try {
        // POST for registration, with req.body
        const res = await axios.post('/admin/register', body, config)

        dispatch({
            type: ADMIN_ADD_SUCCESS,
            // get token from response
            payload: res.data
        })
        dispatch(setAlert('New Admin created', 'success'))


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: ADMIN_ADD_FAIL
        })
    }
}

export const deleteAdmin = (adminID) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }

    // Stringify userdetails
    const id = adminID._id

    try {

        // DELETE service center
        const res = await axios.delete('/admin/' + id)

        dispatch(setAlert(res.data, 'success'))

        // delete from list
        dispatch({
            type: ADMIN_DELETE_SUCCESS,
            payload: id
        })



    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: ADMIN_DELETE_FAIL
        })
    }
}

export const updateAdmin = (admin) => async dispatch => {


    try {
        const id = admin.id
        const body = { id, admin }
        const res = await axios.post('/admin/update/' + id, body)

        dispatch({
            type: UPDATEADMIN_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Admin Updated successfully', 'success'))

    } catch (err) {
        // console.log(err)
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: UPDATEADMIN_FAIL
        })
    }
}



