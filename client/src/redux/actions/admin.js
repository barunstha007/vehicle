import axios from "axios";
import {
    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL,
    ASSIGNSERVICECENTER_SUCCESS,
    ASSIGNSERVICECENTER_FAIL,
    GETADMIN_SUCCESS,
    GETADMIN_FAIL
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

// export const updateAdmin = (admin) => async dispatch => {


//     try {
//         const id = superadmin.id
//         const body = { id, superadmin }
//         const res = await axios.post('/superadmin/update/' + id, body)

//         dispatch({
//             type: UPDATESUPERADMIN_SUCCESS,
//             payload: res.data
//         })
//         // console.log(res.data)
//         dispatch(setAlert('Superadmin Updated successfully', 'success'))

//     } catch (err) {
//         // console.log(err)
//         const errors = err.response.data.error
//         if (errors) {
//             dispatch(setAlert(errors[0].msg, 'danger'))

//         }
//         dispatch({
//             type: UPDATESUPERADMIN_FAIL
//         })
//     }
// }


// export const addAdmin = (adminDetails) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     // Stringify admindetails
//     const body = JSON.stringify(superadminDetails)

//     try {
//         // POST for registration, with req.body
//         const res = await axios.post('/superadmin/register', body, config)

//         dispatch({
//             type: SUPERADMIN_ADD_SUCCESS,
//             // get token from response
//             payload: res.data
//         })
//         dispatch(setAlert('New Superadmin created', 'success'))


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

// export const deleteAdmin = (adminID) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     // Stringify userdetails
//     const id = superadminID._id

//     try {

//         // DELETE service center
//         const res = await axios.delete('/superadmin/' + id)

//         dispatch(setAlert(res.data, 'success'))

//         // delete from list
//         dispatch({
//             type: SUPERADMIN_DELETE_SUCCESS,
//             payload: id
//         })



//     } catch (err) {
//         const errors = err.response.data.error
//         console.log(errors)
//         if (errors) {
//             dispatch(setAlert(errors[0].msg, 'danger'))

//         }
//         dispatch({
//             type: SUPERADMIN_DELETE_FAIL
//         })
//     }
// }
