import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";
import store from "../store";
// actions
import { getServiceCenter } from "./dashboard";

// Load User
export const loadUser = () => async (dispatch) => {
  // if localstorage has token
  if (localStorage.token) {
    // put token in global header
    setAuthToken(localStorage.token);
  }

  try {
    // returns user object
    const res = await axios.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    // superuser
    if (res.data.role === 1) {
      // get admin message
      const res = await axios.get("/feedback/superuser");
      dispatch({ type: "GET_ADMIN_MESSAGE", payload: res.data });
    }

    // admin
    if (res.data.role === 2) {
      await dispatch(getServiceCenter());
      const serviceCenterId = store.getState().dashboard.serviceCenter._id;
      // get Feedbacks
      const res = await axios.get("/feedback/" + serviceCenterId);
      dispatch({ type: "GET_FEEDBACK", payload: res.data });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (userDetails) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Stringify userdetails
  const body = JSON.stringify(userDetails);

  try {
    // POST for registration, with req.body
    const res = await axios.post("/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      // get token from response
      payload: res.data,
    });

    // load user after login
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err, "danger"));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (loginDetails) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Stringify loginDetails
  const body = JSON.stringify(loginDetails);

  try {
    // POST for registration, with req.body
    const res = await axios.post("/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      // get token from response
      payload: res.data,
    });

    // load user after login
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors[0].msg, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
  });
