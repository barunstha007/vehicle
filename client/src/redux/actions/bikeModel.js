import axios from "axios";
import {
    GETBIKEMODEL_SUCCESS,
    GETBIKEMODEL_FAIL,
    BIKEMODEL_ADD_SUCCESS,
    BIKEMODEL_ADD_FAIL,
    BIKEMODEL_DELETE_SUCCESS,
    BIKEMODEL_DELETE_FAIL,
    UPDATEBIKEMODEL_SUCCESS,
    UPDATEBIKEMODEL_FAIL
} from './types';
import { setAlert } from './alert'

export const getBikeModellist = () => async dispatch => {

    try {
        const res = await axios.get('/bikemodel')
        dispatch({
            type: GETBIKEMODEL_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        const error = err.response.data
        if (error) {
            dispatch(setAlert(error, 'danger'))

        }
        dispatch({
            type: GETBIKEMODEL_FAIL
        })
    }
}

export const addbikeModel = (bikeModel) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Stringify admindetails
    const body = JSON.stringify(bikeModel)

    try {
        // POST for registration, with req.body
        const res = await axios.post('/bikemodel/add', body, config)

        dispatch({
            type: BIKEMODEL_ADD_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('New Bike Model created', 'success'))


    } catch (err) {
        dispatch(setAlert(err, 'danger'))

        dispatch({
            type: BIKEMODEL_ADD_FAIL
        })
    }
}

export const deletebikeModel = (bikeModelID) => async dispatch => {

    const id = bikeModelID._id

    try {
        // DELETE bike model
        const res = await axios.delete('/bikemodel/' + id)

        dispatch(setAlert(res.data, 'success'))

        // delete from list
        dispatch({
            type: BIKEMODEL_DELETE_SUCCESS,
            payload: id
        })



    } catch (err) {
        dispatch(setAlert(err.data, 'danger'))
        dispatch({
            type: BIKEMODEL_DELETE_FAIL
        })
    }
}

export const updatebikeModel = (bikeModelDetails) => async dispatch => {


    try {
        const id = bikeModelDetails.id
        const bikeModel = bikeModelDetails.bikeModel
        const body = { bikeModel }
        const res = await axios.post('/bikemodel/update/' + id, body)

        dispatch({
            type: UPDATEBIKEMODEL_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Bike Model Updated successfully', 'success'))

    } catch (err) {

        dispatch(setAlert('Some Error occurred', 'danger'))
        dispatch({
            type: UPDATEBIKEMODEL_FAIL
        })
    }
}

