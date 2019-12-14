import axios from "axios";

const setAuthToken = token => {
    if (token) {
        // send the passed token to axios requests
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken