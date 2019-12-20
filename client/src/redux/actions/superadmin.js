import axios from "axios";
import {
    GETSUPERADMIN_SUCCESS,
    GETSUPERADMIN_FAIL,
    UPDATESUPERADMIN_SUCCESS,
    UPDATESUPERADMIN_FAIL
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
        console.log(errors)
        if (errors) {
            dispatch(setAlert(errors[0].msg, 'danger'))

        }
        dispatch({
            type: GETSUPERADMIN_FAIL
        })
    }
}

export const updateSuperadmin = (id, assignedServiceCenter) => async dispatch => {

    const body = { id, assignedServiceCenter }

    try {
        const res = await axios.post('/update/' + id, body)

        // dispatch({
        //     type: UPDATESUPERADMIN_SUCCESS,
        //     payload: res.data
        // })

        console.log(res.data)

    } catch (err) {
        console.log(err)
        dispatch({
            type: UPDATESUPERADMIN_SUCCESS
        })
    }
}

// Add service center
// export const addSuperadmin = (serviceCenterDetails) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     // Stringify admindetails
//     const body = JSON.stringify(serviceCenterDetails)

//     try {
//         // POST for registration, with req.body
//         const res = await axios.post('/register', body, config)
//         console.log(res.data);

//         dispatch({
//             type: SUPERADMIN_ADD_SUCCESS,
//             // get token from response
//             payload: res.data
//         })


//     } catch (err) {
//         const errors = err.response.data.error
//         console.log(errors)
//         if (errors) {
//             dispatch(setAlert(errors[0].msg, 'danger'))

//         }
//         dispatch({
//             type: SUPERADMIN_ADD_FAIL
//         })
//     }
// }


// export const deleteSuperadmin = (id, assignedServiceCenter) => async dispatch => {

//     const body = { id, assignedServiceCenter }

//     try {
//         const res = await axios.post('/admin/assignServiceCenter', body)

//         dispatch({
//             type: ASSIGNSERVICECENTER_SUCCESS,
//             payload: res.data
//         })

//         console.log('Action=> AssignServiceCenterSuccess')
//         console.log(res.data)

//     } catch (err) {
//         console.log(err)
//         dispatch({
//             type: ASSIGNSERVICECENTER_FAIL
//         })
//     }
// }


