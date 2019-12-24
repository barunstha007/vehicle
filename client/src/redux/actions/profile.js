import axios from "axios";
import {
    GETPROFILE_SUCCESS,
    GETPROFILE_FAIL
} from './types';
import { setAlert } from './alert'

export const getProfile = () => async dispatch => {

    try {
        const res = await axios.get('/profile')
        // console.log(res.data)

        dispatch({
            type: GETPROFILE_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETPROFILE_FAIL
        })
    }
}

export const updateProfile = () => async dispatch => {

    try {
        const res = await axios.get('/profile/update')
        // console.log(res.data)

        dispatch({
            type: GETPROFILE_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETPROFILE_FAIL
        })
    }
}
