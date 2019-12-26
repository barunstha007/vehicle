import {
    BIKE_ADDORUPDATE_SUCCESS,
    BIKE_ADDORUPDATE_FAIL
} from '../actions/types'

const initialState = {
    userBike: {},
    requestedStatus: false,
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {

        case BIKE_ADDORUPDATE_SUCCESS:
            // update object
            return {
                ...state,
                userBike: action.payload,
                requestedStatus: true,
                loading: false
            }

        default: return state
    }
}