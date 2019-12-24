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
            return Object.assign({}, state, {
                userProfile: action.payload
            })


        case UPDATEPROFILE_SUCCESS:
            // update object
            return {
                ...state,
                userProfile: action.payload,
            }

        default: return state
    }
}