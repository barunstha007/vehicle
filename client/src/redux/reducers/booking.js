import {
  BOOKING_SUCCESS,
  // BOOKING_FAIL,
  GETBOOKINGBYID_SUCCESS,
  // GETBOOKINGBYID_FAIL,
  CANCLEBOOKING_SUCCESS,
  GETBOOKINGQUEUE_SUCCESS,
  BOOKINGACCEPT_SUCCESFULL,
  GETACCEPTEDBOOKING_SUCCESS,
  REQUEUEBIKE_SUCCESS,
} from "../actions/types";

const initialState = {
  bookingDetails: {
    bookingStatus: 0,
    serviceCenter: {
      id: "",
      name: "",
    },
    completionRead: false,
    lastBookingDate: null,
    bookingDate: null,
    servicingDate: "",
    totalPrice: 0,
  },

  queueDetails: [],
  acceptedBooking: [],

  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @Access customer
    case GETBOOKINGBYID_SUCCESS:
      return {
        ...state,
        bookingDetails: Object.assign({}, action.payload),
        loading: false,
      };

    case BOOKING_SUCCESS:
      return {
        ...state,
        ...state.bookingDetails,
        bookingDetails: {
          bookingStatus: action.payload.bookingStatus,
          serviceCenter: Object.assign({}, action.payload.serviceCenter),
          bookingDate: action.payload.bookingDate,
        },
        // <select> initial value
        // initialSelect: action.payload[0]._id,
        loading: false,
      };

    case CANCLEBOOKING_SUCCESS:
      return {
        ...state,
        bookingDetails: {
          bookingStatus: 0,
          serviceCenter: null,
          bookingDate: null,
        },

        loading: false,
      };

    // @Access admin
    case GETBOOKINGQUEUE_SUCCESS:
      return {
        ...state,
        queueDetails: [...action.payload],

        loading: false,
      };

    case "CHANGESERVICINGDATE":
      let queueDetails = [...state.queueDetails];
      queueDetails[action.index] = {
        ...queueDetails[action.index],
        servicingDate: action.date,
      };

      return {
        ...state,
        queueDetails,
        loading: false,
      };

    case BOOKINGACCEPT_SUCCESFULL:
      const submittedIds = action.payload.map(({ bikeid }) => bikeid);

      return {
        ...state,
        queueDetails: state.queueDetails.filter(
          (queue) => !submittedIds.includes(queue.bike._id)
        ),
        loading: false,
      };

    // @Access admin
    case GETACCEPTEDBOOKING_SUCCESS:
      return {
        ...state,
        acceptedBooking: [...action.payload],

        loading: false,
      };

    case REQUEUEBIKE_SUCCESS:

      return {
        ...state,
        acceptedBooking: state.acceptedBooking.filter(
          (accepted) => !action.payload.includes(accepted.bike._id)
        ),
        // queueDetails: queuebike
      };

    case "COMPLETE_SERVICING":
      return {
        ...state,
        acceptedBooking: state.acceptedBooking.filter(
          (accepted) => !action.payload.includes(accepted.bike._id)
        ),
        // queueDetails: queuebike
      };

    case 'COMPLETE_BOOKING_SUCCESS':
      return {
        ...state,
        bookingDetails: { ...state.bookingDetails, completionRead: true }
      }
    default:
      return state;
  }
}
