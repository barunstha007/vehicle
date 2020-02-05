import {
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    GETBOOKINGBYID_SUCCESS,
    GETBOOKINGBYID_FAIL,
    CANCLEBOOKING_SUCCESS,
    GETBOOKINGQUEUE_SUCCESS,
    BOOKINGACCEPT_SUCCESFULL
} from '../actions/types'

const initialState = {
    bookingDetails: {
        bookingStatus: 0,
        serviceCenter: {
            id: '',
            name: ''
        },
        lastBookingDate: null,
        bookingDate: null,
        servicingDate: '',
        totalPrice: 0
    },

    queueDetails: [
        // {
        //     servicingDate: '',
        //     bookingStatus: '',
        //     bike: { _id: '', user: '' }
        // }
    ],

    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {

        // @Access customer
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
                    serviceCenter: Object.assign({}, action.payload.serviceCenter),
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

                loading: false
            }

        // @Access admin
        case GETBOOKINGQUEUE_SUCCESS:
            return {
                ...state,
                queueDetails: [...action.payload],

                loading: false
            }

        case 'CHANGESERVICINGDATE':

            let queueDetails = [...state.queueDetails];
            queueDetails[action.index] = { ...queueDetails[action.index], servicingDate: action.date };

            return {
                ...state,
                queueDetails,
                loading: false
            }

        case BOOKINGACCEPT_SUCCESFULL:

            const newArr = action.payload.map(payload => {
                return (
                    state.queueDetails.filter(queue => queue.bike._id !== payload.bikeid)
                )
            })
            return {
                ...state,

                queueDetails: newArr
            }





        default: return state
    }
}
