import {
    GETSERVICECENTER_SUCCESS,
    GETSERVICECENTER_FAIL,
    SERVICECENTER_ADD_SUCCESS,
    SERVICECENTER_ADD_FAIL,
    SERVICECENTER_UPDATE_SUCCESS,
    SERVICECENTER_UPDATE_FAIL,
    SERVICECENTER_DELETE_SUCCESS
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
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        case SERVICECENTER_ADD_SUCCESS:
            return {
                ...state,
                sclist: state.sclist.concat(action.payload)
            }
        case SERVICECENTER_UPDATE_SUCCESS:
            // var updateDetails = state.sclist.filter(action.payload._id)
            var updateDetails = state.sclist.map(sc => {
                if (sc._id === action.payload._id) {
                    return {
                        ...state,
                        sclist: action.payload
                    }
                }
            })



        case SERVICECENTER_DELETE_SUCCESS:
            return {
                ...state,
                // remove id from sclist
                sclist: state.sclist.filter(sc => sc._id !== action.payload)

            }



        default: return state
    }
}