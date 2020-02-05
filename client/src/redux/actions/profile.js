import axios from "axios";
import {
    GETPROFILE_SUCCESS,
    GETPROFILE_FAIL,
    UPDATEPROFILE_SUCCESS
} from './types';
import { setAlert } from './alert'

export const getProfile = () => async dispatch => {

    try {
        const res = await axios.get('/profile/user')
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

export const updateProfile = (profileDetails) => async dispatch => {

    try {
        const res = await axios.post('/profile/update/' + profileDetails.id, profileDetails)

        dispatch({
            type: UPDATEPROFILE_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Profile updated successfully', 'success'))


    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors, 'danger'))

        }
        dispatch({
            type: GETPROFILE_FAIL
        })
    }
}
