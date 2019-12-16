import {
    GETSERVICECENTER_SUCCESS,
    GETSERVICECENTER_FAIL,
    SERVICECENTER_ADD_SUCCESS,
    SERVICECENTER_ADD_FAIL
} from '../actions/types'

const initialState = {
    sclist: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETSERVICECENTER_SUCCESS:
            return {
                ...state,
                sclist: [...action.payload],
                // <select> initial value
                initialSelect: action.payload[0]._id,
                loading: false
            }

        case SERVICECENTER_ADD_SUCCESS: break

        default: return state
    }
}