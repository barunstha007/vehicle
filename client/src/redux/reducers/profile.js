import {
    GETPROFILE_SUCCESS,
    UPDATEPROFILE_SUCCESS
} from '../actions/types'

const initialState = {
    userProfile: {},
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETPROFILE_SUCCESS:
            // Insert object to object
            // return Object.assign({}, state, {
            //     userProfile: action.payload
            // })
            return {
                ...state,
                userProfile: Object.assign({}, action.payload),
                loading: false
            }


        case UPDATEPROFILE_SUCCESS:
            // update object
            return {
                ...state,
                userProfile: action.payload,
                loading: false
            }

        default: return state
    }
}