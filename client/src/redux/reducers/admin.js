import {
    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL,
    UPDATEVACANTADMIN_SUCCESS,
    // POWER USERS
    GETADMIN_SUCCESS
} from '../actions/types'

const initialState = {
    vadminlist: [],
    adminlist: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETVACANTADMIN_SUCCESS:
            return {
                ...state,
                vadminlist: [...action.payload],
                // <select> initial value
                // initialSelect: action.payload[0]._id,
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

        // Update admin list after create
        case UPDATEVACANTADMIN_SUCCESS:
            return {
                ...state,
                vadminlist: state.vadminlist.filter(admin => admin._id !== action.payload),
                // <select> initial value
                loading: false
            }



        // POWER USERS


        case GETADMIN_SUCCESS:
            return {
                ...state,
                adminlist: [...action.payload],
                loading: false
            }

        // case UPDATEADMIN_SUCCESS:

        //     // find index of given id in list
        //     const index = state.superadminlist.findIndex(sc => {
        //         return sc._id == action.payload._id
        //     })

        //     // array, index to replace, item to replace
        //     const newArray = Object.assign([], state.superadminlist, { [index]: action.payload });

        //     return {
        //         ...state,
        //         superadminlist: newArray
        //     }

        // case ADMIN_ADD_SUCCESS:
        //     return {
        //         ...state,
        //         superadminlist: [...state.superadminlist, action.payload],
        //         loading: false
        //     }

        // case ADMIN_DELETE_SUCCESS:
        //     return {
        //         ...state,
        //         // remove id from sclist
        //         superadminlist: state.superadminlist.filter(su => su._id !== action.payload)

        //     }

        default: return state
    }
}