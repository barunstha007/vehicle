import React, { useState, useEffect } from "react";
import "../Profile.css";
import { InputGroup, Button } from "react-bootstrap";
import { MdRemoveRedEye } from "react-icons/md";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile, updateProfile } from "../../redux/actions/profile";
import { updateServiceCenter } from "../../redux/actions/serviceCenterList";
import Alert from "../../layout/Alert";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
  useEffect(() => {
    props.getProfile();
  }, []);

  // Admin profile details
  const [state, setState] = useState({
    editUserToggle: false,
    editSCToggle: false,
    passwordHidden: false,
    // bookingStatus: false,

    id: "",
    username: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    avatar: "",
  });

  // password show/hide
  const passwordShowBtn = () => {
    setState({
      ...state,
      passwordHidden: state.passwordHidden ? false : true,
    });
  };

  // Input admin profile onChange
  const inputChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // on Edit set profile props to local state
  const editDashboardHandler = () => {
    setState({
      id: props.userProfile._id,
      name: props.userProfile.name,
      username: props.userProfile.username,
      email: props.userProfile.email,
      phone: props.userProfile.phone,
      location: props.userProfile.location,

      editUserToggle: true,
    });
  };

  // Edit cancel, toggle off
  const editDashboardCancel = () => {
    setState({
      editUserToggle: false,
    });
  };

  // Initial Render
  function userDetails() {
    return (
      <React.Fragment>
        {/* Title and value */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Username</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.userProfile.username}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Name</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.userProfile.name}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Email</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.userProfile.email}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Phone</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.userProfile.phone}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Location</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.userProfile.location}</p>
          </div>
        </div>
        <br />
        {editorSubmitEditbtn()}
      </React.Fragment>
    );
  }

  // on edit toggle
  function editUserDetails() {
    return (
      <React.Fragment>
        {/* Title and value */}
        {/* Username */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Username</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        {/* Name */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Name</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="name"
              value={state.name}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        {/* Email */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Email</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="email"
              value={state.email}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        {/* Phone */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Phone</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="phone"
              value={state.phone}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        {/* Location */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Location</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="location"
              value={state.location}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        {/* Password */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Password</label>
          </div>
          <div className="col-6 p-1">
            <InputGroup>
              <input
                name="password"
                className="form-control"
                onChange={inputChangeHandler}
                type={state.passwordHidden ? "text" : "password"}
                placeholder="New Password"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={passwordShowBtn}>
                  <MdRemoveRedEye />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <br />
        {/* edit button type */}
        {editorSubmitEditbtn()}
      </React.Fragment>
    );
  }

  function editorSubmitEditbtn() {
    if (state.editUserToggle) {
      return (
        <div className="row">
          <div className="col-6 p-1">
            <label />
          </div>
          <div className="col-3 p-1">
            <p>
              <span
                className="btn btn-success text-white"
                onClick={editDashboardSubmit}
              >
                Save
              </span>
            </p>
          </div>
          <div className="col-3 ">
            <p>
              <span
                className="btn btn-danger text-white"
                onClick={editDashboardCancel}
              >
                Cancel
              </span>
            </p>
          </div>
        </div>
      );
    } else
      return (
        <div className="row">
          {/* Edit profile */}
          <div className="col-6 p-1">
            <label />
          </div>
          <div className="col-6 p-1">
            <p>
              <span
                className="btn btn-secondary text-white"
                onClick={editDashboardHandler}
              >
                Edit Profile
              </span>
            </p>
          </div>
        </div>
      );
  }

  // Submit Edit Profile
  const editDashboardSubmit = (e) => {
    const editDetails = {
      id: state.id,
      username: state.username,
      name: state.name,
      email: state.email,
      phone: state.phone,
      location: state.location,
      password: state.password,
    };
    props.updateProfile(editDetails);

    setState({
      ...state,
      editUserToggle: false,

      id: "",
      username: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      password: "",
      avatar: "",
    });
  };

  // -----------------------------SERVICE CENTER ---------------------------------------------

  // service center profile details
  const [serviceCenterState, setServiceCenterState] = useState({
    editSCToggle: false,

    id: "",
    admin: "",
    name: "",
    serviceLocation: "",
    maxBookingDays: "",
    bookingLimit: "",
    contact: "",
  });

  // Input service center onChange
  const scinputChangeHandler = (e) => {
    setServiceCenterState({
      ...serviceCenterState,
      [e.target.name]: e.target.value,
    });
  };

  // on Edit sc
  const sceditDashboardHandler = () => {
    setServiceCenterState({
      id: props.serviceCenter._id,
      name: props.serviceCenter.name,
      serviceLocation: props.serviceCenter.serviceLocation,
      maxBookingDays: props.serviceCenter.maxBookingDays,
      bookingLimit: props.serviceCenter.bookingLimit,
      contact: props.serviceCenter.contact,

      editSCToggle: true,
    });
  };

  // Edit cancel
  const sceditDashboardCancel = () => {
    setServiceCenterState({
      editSCToggle: false,
    });
  };

  // Initial SC Render
  function serviceCenter() {
    return (
      <div
        className="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        {/* Title and value */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Service Center Name</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.serviceCenter.name}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Location</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.serviceCenter.serviceLocation}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Max Booking Days</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.serviceCenter.maxBookingDays}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 p-1">
            <label>Booking Limit</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.serviceCenter.bookingLimit}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-6 p-1">
            <label>Contact</label>
          </div>
          <div className="col-6 p-1">
            <p>{props.serviceCenter.contact}</p>
          </div>
        </div>
        <br />
        {sceditorSubmitEditbtn()}
      </div>
    );
  }

  // on edit toggle
  function editServiceCenter() {
    return (
      <div
        className="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        {/* SC Name */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Service Center Name</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="name"
              value={serviceCenterState.name}
              onChange={scinputChangeHandler}
            />
          </div>
        </div>

        {/* Location */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Location</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="serviceLocation"
              value={serviceCenterState.serviceLocation}
              onChange={scinputChangeHandler}
            />
          </div>
        </div>
        {/* Max Booking Days */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Max Booking Days</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="number"
              className="form-control"
              name="maxBookingDays"
              value={serviceCenterState.maxBookingDays}
              onChange={scinputChangeHandler}
            />
          </div>
        </div>
        {/* Booking Limit */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Booking Limit</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="number"
              className="form-control"
              name="bookingLimit"
              value={serviceCenterState.bookingLimit}
              onChange={scinputChangeHandler}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="row">
          <div className="col-6 p-1">
            <label>Contact</label>
          </div>
          <div className="col-6 p-1">
            <input
              type="text"
              className="form-control"
              name="contact"
              value={serviceCenterState.contact}
              onChange={scinputChangeHandler}
            />
          </div>
        </div>
        <br />
        {/* edit button type */}
        {sceditorSubmitEditbtn()}
      </div>
    );
  }

  function sceditorSubmitEditbtn() {
    if (serviceCenterState.editSCToggle) {
      return (
        <div className="row">
          <div className="col-6 p-1">
            <label />
          </div>
          <div className="col-3 p-1">
            <p>
              <span
                className="btn btn-success text-white"
                onClick={sceditDashboardSubmit}
              >
                Save
              </span>
            </p>
          </div>
          <div className="col-3 ">
            <p>
              <span
                className="btn btn-danger text-white"
                onClick={sceditDashboardCancel}
              >
                Cancel
              </span>
            </p>
          </div>
        </div>
      );
    } else
      return (
        <div className="row">
          {/* Edit profile */}
          <div className="col-6 p-1">
            <label />
          </div>
          <div className="col-6 p-1">
            <p>
              <span
                className="btn btn-secondary text-white"
                onClick={sceditDashboardHandler}
              >
                Edit Service Center
              </span>
            </p>
          </div>
        </div>
      );
  }

  // Submit Edit service center
  const sceditDashboardSubmit = (e) => {
    const editDetails = {
      id: serviceCenterState.id,
      admin: props.userProfile._id,
      name: serviceCenterState.name,
      serviceLocation: serviceCenterState.serviceLocation,
      maxBookingDays: serviceCenterState.maxBookingDays,
      bookingLimit: serviceCenterState.bookingLimit,
      contact: serviceCenterState.contact,
    };

    // Update admins service center
    props.updateServiceCenter(editDetails);

    setServiceCenterState({
      ...serviceCenterState,
      editSCToggle: false,

      id: "",
      name: "",
      serviceLocation: "",
      maxBookingLimit: "",
      bookingLimit: "",
      contact: "",
    });
  };

  // ------------------- RENDER ---------------------------------------------

  // return to login if not authenticated
  if (!props.loading && !props.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="container emp-profile shadow">
      <form method="post">
        {/* upload photo and Title Row */}
        <div className="row">
          {/* Upload photo */}
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src={props.userProfile.avatar}
                alt=""
                style={{ maxHeight: "20vh", maxWidth: "20vh" }}
              />
              <div className="file btn btn-lg btn-primary">
                Upload Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          {/* top right div */}
          <div className="col-md-6">
            <div className="profile-head">
              <h5 style={{ textTransform: "uppercase" }}>
                {props.userProfile.name}
              </h5>

              <p className="proile-rating">
                BOOKING RANKINGS : <span>8/40</span>
              </p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Service Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom div */}
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <Alert />
            <div className="tab-content profile-tab ml-3" id="myTabContent">
              <div
                className="tab-pane fade show active "
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {state.editUserToggle ? editUserDetails() : userDetails()}
              </div>

              {serviceCenterState.editSCToggle
                ? editServiceCenter()
                : serviceCenter()}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.profile.userProfile,
  serviceCenter: state.dashboard.serviceCenter,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  authStatus: state.auth.authStatus,
});

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  updateServiceCenter,
})(Dashboard);
