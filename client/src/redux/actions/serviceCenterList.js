import axios from "axios";
import { GETSERVICECENTER_SUCCESS, GETSERVICECENTER_FAIL } from './types';

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
