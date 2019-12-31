import {
    BOOKING_SUCCESS,
    BOOKING_FAIL
} from '../actions/types'

const initialState = {
    bikeModellist: [],

    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case BOOKING_SUCCESS:
            return {
                ...state,
                bikeModellist: [...action.payload],
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        default: return state
    }
}