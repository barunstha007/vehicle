import {
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    GETBOOKINGBYID_SUCCESS,
    GETBOOKINGBYID_FAIL,
    CANCLEBOOKING_SUCCESS
} from '../actions/types'

const initialState = {
    bookingDetails: {
        bookingStatus: 0,
        serviceCenter: '',
        lastBookingDate: null,
        bookingDate: null,
        servicingDate: '',
        totalPrice: 0
    },

    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GETBOOKINGBYID_SUCCESS:
            return {
                ...state,
                bookingDetails: Object.assign({}, action.payload),
                loading: false
            }

        case BOOKING_SUCCESS:
            return {
                ...state,
                ...state.bookingDetails,
                bookingDetails: {
                    bookingStatus: action.payload.bookingStatus,
                    serviceCenter: action.payload.serviceCenter.name,
                    bookingDate: action.payload.bookingDate
                },
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        case CANCLEBOOKING_SUCCESS:

            return {
                ...state,
                bookingDetails: {
                    bookingStatus: 0,
                    serviceCenter: null,
                    bookingDate: null
                },
                // <select> initial value
                // initialSelect: action.payload[0]._id,
                loading: false
            }

        default: return state
    }
}