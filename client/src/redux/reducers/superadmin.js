import {
    GETSUPERADMIN_SUCCESS,
    GETSUPERADMIN_FAIL,
    UPDATESUPERADMIN_SUCCESS,
    UPDATESUPERADMIN_FAIL
} from '../actions/types'

const initialState = {
    superadminlist: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETSUPERADMIN_SUCCESS:
            return {
                ...state,
                superadminlist: [...action.payload],
                loading: false
            }

        // case UPDATESUPERADMIN_SUCCESS:
        //     state.superadminlist.map(sa => {
        //         if (sa._id === action.payload._id) {
        //             return {
        //                 ...state,
        //                 sclist: action.payload
        //             }
        //         }
        //     })

        case GETSUPERADMIN_FAIL:
        case UPDATESUPERADMIN_FAIL:

        default: return state
    }
}