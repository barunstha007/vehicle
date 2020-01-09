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

export const updateServiceCenter = (serviceCenterDetails) => async dispatch => {

    try {
        const res = await axios.post('/service-center/admin')
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

// export const addAdmin = (adminDetails) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     // Stringify admindetails
//     const body = JSON.stringify(adminDetails)

//     try {
//         // POST for registration, with req.body
//         const res = await axios.post('/admin/register', body, config)

//         dispatch({
//             type: ADMIN_ADD_SUCCESS,
//             // get token from response
//             payload: res.data
//         })
//         dispatch(setAlert('New Admin created', 'success'))


//     } catch (err) {
//         const errors = err.response.data.error
//         console.log(errors)
//         if (errors) {
//             dispatch(setAlert(errors[0].msg, 'danger'))

//         }
//         dispatch({
//             type: ADMIN_ADD_FAIL
//         })
//     }
// }

// export const updateAdmin = (admin) => async dispatch => {


//     try {
//         const id = admin.id
//         const body = { id, admin }
//         const res = await axios.post('/admin/update/' + id, body)

//         dispatch({
//             type: UPDATEADMIN_SUCCESS,
//             payload: res.data
//         })

//         dispatch(setAlert('Admin Updated successfully', 'success'))

//     } catch (err) {
//         // console.log(err)
//         const errors = err.response.data.error
//         if (errors) {
//             dispatch(setAlert(errors[0].msg, 'danger'))

//         }
//         dispatch({
//             type: UPDATEADMIN_FAIL
//         })
//     }
// }
