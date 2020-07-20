
const initialState = {
    feedbackList: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_FEEDBACK':
            return {
                ...state,
                feedbackList: [...action.payload],
                loading: false
            }




        default: return state
    }
}