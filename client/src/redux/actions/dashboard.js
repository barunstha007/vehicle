import axios from "axios";
import {
    GETSERVICECENTERBYID_SUCCESS,
    GETSERVICECENTERBYID_FAIL
} from './types';
import { setAlert } from './alert'

export const getServiceCenter = () => async dispatch => {

    try {
        const res = await axios.get('/service-center/admin')
        console.log(res)

        dispatch({
            type: GETSERVICECENTERBYID_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.error
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETSERVICECENTERBYID_FAIL
        })
    }
}

