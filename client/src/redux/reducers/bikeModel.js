import {
    GETBIKEMODEL_SUCCESS,
    // GETBIKEMODEL_FAIL,
    BIKEMODEL_ADD_SUCCESS,
    // BIKEMODEL_ADD_FAIL,
    BIKEMODEL_DELETE_SUCCESS,
    // BIKEMODEL_DELETE_FAIL,
    UPDATEBIKEMODEL_SUCCESS,
    // UPDATEBIKEMODEL_FAIL
} from '../actions/types'

const initialState = {
    bikeModellist: [],

    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GETBIKEMODEL_SUCCESS:
            return {
                ...state,
                bikeModellist: [...action.payload],
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        // Update existing bike model
        case UPDATEBIKEMODEL_SUCCESS:

            // find index of given id in list
            const index = state.bikeModellist.findIndex(bikeModel => {
                return bikeModel._id == action.payload._id
            })

            // array, index to replace, item to replace
            const newArray = Object.assign([], state.bikeModellist, { [index]: action.payload });

            return {
                ...state,
                bikeModellist: newArray
            }



        case BIKEMODEL_ADD_SUCCESS:
            return {
                ...state,
                bikeModellist: [...state.bikeModellist, action.payload],
                loading: false
            }

        case BIKEMODEL_DELETE_SUCCESS:
            return {
                ...state,
                // remove id from sclist
                bikeModellist: state.bikeModellist.filter(bikeModel => bikeModel._id !== action.payload)

            }


        default: return state
    }
}