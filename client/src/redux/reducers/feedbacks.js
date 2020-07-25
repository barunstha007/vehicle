const initialState = {
  feedbackList: [],
  // superuser
  adminMessage: [],

  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_FEEDBACK":
      return {
        ...state,
        feedbackList: [...action.payload],
        loading: false,
      };
    case "GET_ADMIN_MESSAGE":
      return {
        ...state,
        adminMessage: [...action.payload],
        loading: false,
      };

    default:
      return state;
  }
}
