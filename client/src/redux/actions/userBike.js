import axios from "axios";
import {
    GETBIKE_SUCCESS,
    GETBIKE_FAIL,
    BIKE_ADDORUPDATE_SUCCESS,
    BIKE_ADDORUPDATE_FAIL
} from './types';
import { setAlert } from './alert'
import { Redirect } from "react-router-dom";

export const getBike = () => async dispatch => {

    try {
        const res = await axios.get('/bike')
        dispatch({
            type: GETBIKE_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        const error = err.response.data
        if (error) {
            dispatch(setAlert(error, 'danger'))

        }
        dispatch({
            type: GETBIKE_FAIL
        })
    }
}

export const addOrUpdatebike = (bikeDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify bikeDetails
    const body = JSON.stringify(bikeDetails)

    try {

        // POST for registration, with req.body
        const res = await axios.post('/bike/addorupdate', body, config)

        dispatch({
            type: BIKE_ADDORUPDATE_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Bike changes successful', 'success'))


    } catch (err) {
        const errors = err.response.data
        if (errors)
            dispatch(setAlert(errors.error[0].msg, 'danger'))

        dispatch({
            type: BIKE_ADDORUPDATE_FAIL
        })
    }
}

// export const deletebike = (bikeID) => async dispatch => {

//     const id = bikeID._id

//     try {
//         // DELETE bike model
//         const res = await axios.delete('/bike/' + id)

//         dispatch(setAlert(res.data, 'success'))

//         // delete from list
//         dispatch({
//             type: BIKE_DELETE_SUCCESS,
//             payload: id
//         })



//     } catch (err) {
//         dispatch(setAlert(err.data, 'danger'))
//         dispatch({
//             type: BIKE_DELETE_FAIL
//         })
//     }
// }

// export const updatebike = (bikeDetails) => async dispatch => {


//     try {
//         const id = bikeDetails.id
//         const bike = bikeDetails.bike
//         const body = { bike }
//         const res = await axios.post('/bike/update/' + id, body)

//         dispatch({
//             type: UPDATEBIKE_SUCCESS,
//             payload: res.data
//         })

//         dispatch(setAlert('Bike Model Updated successfully', 'success'))

//     } catch (err) {

//         dispatch(setAlert('Some Error occurred', 'danger'))
//         dispatch({
//             type: UPDATEBIKE_FAIL
//         })
//     }
// }

