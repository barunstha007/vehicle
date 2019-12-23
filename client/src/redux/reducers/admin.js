import {
    GETVACANTADMIN_SUCCESS,
    GETVACANTADMIN_FAIL,
    UPDATEVACANTADMIN_SUCCESS,
    UPDATE_ASSIGNED_ADMIN_SUCCESS,
    // POWER USERS
    GETADMIN_SUCCESS,
    ADMIN_ADD_SUCCESS,
    ADMIN_ADD_FAIL,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_FAIL,
    UPDATEADMIN_SUCCESS,
    UPDATEADMIN_FAIL
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

        // remove vacant admin from list after create service center
        case UPDATEVACANTADMIN_SUCCESS:
            return {
                ...state,
                vadminlist: state.vadminlist.filter(admin => admin._id !== action.payload),
                // <select> initial value
                loading: false
            }

        // add vacant admin to list after delete service center
        case UPDATE_ASSIGNED_ADMIN_SUCCESS:
            return {
                ...state,
                vadminlist: [...state.vadminlist, action.payload],
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

        case ADMIN_ADD_SUCCESS:
            return {
                ...state,
                adminlist: [...state.adminlist, action.payload],
                loading: false
            }

        case ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                // remove id from sclist
                adminlist: state.adminlist.filter(admin => admin._id !== action.payload)

            }

        case UPDATEADMIN_SUCCESS:

            // find index of given id in list
            const index = state.adminlist.findIndex(admin => {
                return admin._id == action.payload._id
            })

            // array, index to replace, item to replace
            const newArray = Object.assign([], state.adminlist, { [index]: action.payload });

            return {
                ...state,
                adminlist: newArray
            }


        default: return state
    }
}