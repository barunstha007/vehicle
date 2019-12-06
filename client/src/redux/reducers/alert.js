import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = []

// Reducers always takes previous state and an action
export default function (state = initialState, action) {
    // check type of action called and return new state accordingly
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}