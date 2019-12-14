import {
    GETSERVICECENTER_SUCCESS,
    GETSERVICECENTER_FAIL
} from '../actions/types'

const initialState = {
    sclist: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETSERVICECENTER_SUCCESS:
            return {
                ...state,
                sclist: [...action.payload],
                // <select> initial value
                initialSelect: action.payload[0]._id
            }

        default: return state
    }
}