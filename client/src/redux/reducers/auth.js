import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

const inititalState = {
    // token we got back from local storage
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    authStatus: 0,
    loading: true,
    user: null
}

export default function (state = inititalState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                authStatus: action.payload.role,
                user: action.payload,
                loading: false
            }

        // REGISTER USER
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // If register is success we get token back
            localStorage.setItem('token', action.payload.token)

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                authStatus: action.payload.role,
                loading: false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }


        default: return state
    }
}