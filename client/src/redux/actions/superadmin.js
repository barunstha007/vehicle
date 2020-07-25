import axios from "axios";
import {
    GETSUPERADMIN_SUCCESS,
    GETSUPERADMIN_FAIL,
    SUPERADMIN_ADD_SUCCESS,
    UPDATESUPERADMIN_SUCCESS,
    UPDATESUPERADMIN_FAIL,
    SUPERADMIN_ADD_FAIL,
    SUPERADMIN_DELETE_SUCCESS,
    SUPERADMIN_DELETE_FAIL
} from './types';
import { setAlert } from './alert'

export const getSuperadmin = () => async dispatch => {

    try {
        const res = await axios.get('/superadmin')

        dispatch({
            type: GETSUPERADMIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETSUPERADMIN_FAIL
        })
    }
}

export const updateSuperadmin = (superadmin) => async dispatch => {


    try {
        const id = superadmin.id
        const body = { id, superadmin }
        const res = await axios.post('/superadmin/update/' + id, body)

        dispatch({
            type: UPDATESUPERADMIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Superadmin Updated successfully', 'success'))

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: UPDATESUPERADMIN_FAIL
        })
    }
}


export const addSuperadmin = (superadminDetails, setState) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify admindetails
    const body = JSON.stringify(superadminDetails)

    try {
        // POST for registration, with req.body
        const res = await axios.post('/superadmin/register', body, config)

        dispatch({
            type: SUPERADMIN_ADD_SUCCESS,
            // get token from response
            payload: res.data,
            status: res.status
        })
        dispatch(setAlert('New Superadmin created', 'success'))
        setState({
            name: "",
            location: "",
            phone: "",
            email: "",
            username: "",
            password: "",
            passwordHidden: true
        })


    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: SUPERADMIN_ADD_FAIL
        })
    }
}

export const deleteSuperadmin = (superadminID) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }

    // Stringify userdetails
    const id = superadminID._id

    try {

        // DELETE service center
        const res = await axios.delete('/superadmin/' + id)

        dispatch(setAlert(res.data, 'success'))

        // delete from list
        dispatch({
            type: SUPERADMIN_DELETE_SUCCESS,
            payload: id
        })



    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: SUPERADMIN_DELETE_FAIL
        })
    }
}