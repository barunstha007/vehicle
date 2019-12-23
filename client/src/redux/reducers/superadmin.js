import {
    GETSUPERADMIN_SUCCESS,
    GETSUPERADMIN_FAIL,
    SUPERADMIN_ADD_SUCCESS,
    SUPERADMIN_ADD_FAIL,
    UPDATESUPERADMIN_SUCCESS,
    UPDATESUPERADMIN_FAIL,
    SUPERADMIN_DELETE_SUCCESS,
    SUPERADMIN_DELETE_FAIL
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

        case UPDATESUPERADMIN_SUCCESS:

            // find index of given id in list
            const index = state.superadminlist.findIndex(sc => {
                return sc._id == action.payload._id
            })
            console.log(index)

            // array, index to replace, item to replace
            const newArray = Object.assign([], state.superadminlist, { [index]: action.payload });

            return {
                ...state,
                superadminlist: newArray
            }

        case SUPERADMIN_ADD_SUCCESS:
            return {
                ...state,
                superadminlist: [...state.superadminlist, action.payload],
                loading: false
            }

        case SUPERADMIN_DELETE_SUCCESS:
            return {
                ...state,
                // remove id from sclist
                superadminlist: state.superadminlist.filter(su => su._id !== action.payload)

            }

        case GETSUPERADMIN_FAIL:
        case UPDATESUPERADMIN_FAIL:
        case SUPERADMIN_DELETE_FAIL:

        default: return state
    }
}