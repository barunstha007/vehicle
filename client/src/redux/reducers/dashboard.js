import {
    GETSERVICECENTERBYID_SUCCESS,
    // GETSERVICECENTERBYID_FAIL,
    SERVICECENTER_UPDATE_SUCCESS
} from '../actions/types'

const initialState = {
    serviceCenter: {},
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETSERVICECENTERBYID_SUCCESS:
            return {
                ...state,

                serviceCenter: Object.assign({}, action.payload),
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        case SERVICECENTER_UPDATE_SUCCESS:
            return {
                ...state,

                serviceCenter: Object.assign({}, action.payload),
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }
        default: return state
    }
}