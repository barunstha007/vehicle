import {
    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL
} from '../actions/types'

const initialState = {
    vadminlist: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETVACANTADMIN_SUCCESS:
            return {
                ...state,
                vadminlist: [...action.payload],
                // <select> initial value
                initialSelect: action.payload[0]._id,
                loading: false
            }

        case GETVACANTADMIN_FAIL:
            return {
                ...state,
                vadminlist: ['Empty'],
                // <select> initial value
                initialSelect: null,
                loading: false
            }

        default: return state
    }
}