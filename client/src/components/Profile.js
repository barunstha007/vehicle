import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { InputGroup, Button } from 'react-bootstrap'
import { MdRemoveRedEye } from 'react-icons/md'
import ServiceCenterBook from '../layout/ServiceCenterBook'
import Moment from 'react-moment'
//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getProfile, updateProfile } from '../redux/actions/profile'
import { getUserBike } from '../redux/actions/userBike'
import { getBooking } from '../redux/actions/booking'
import { cancleServicing } from '../redux/actions/booking'
import Alert from '../layout/Alert'
import { Redirect } from 'react-router-dom'

function Profile(props) {

    useEffect(() => {
        props.getProfile()
        props.getUserBike()
        props.getBooking()

    }, [])

    const [state, setState] = useState({
        editToggle: false,
        passwordHidden: false,

        id: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        location: "",
        password: "",
        avatar: ""

    })

    // return to login if not authenticated
    if (!props.loading && !props.isAuthenticated) return (<Redirect to="/login" />)
    // Input state onChange
    const inputChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    // password show/hide
    const passwordShowBtn = () => {
        setState({
            ...state,
            passwordHidden: state.passwordHidden ? false : true
        })
    }

    // on Edit Profile
    const editProfileHandler = () => {
        setState({
            id: props.userProfile._id,
            name: props.userProfile.name,
            username: props.userProfile.username,
            email: props.userProfile.email,
            phone: props.userProfile.phone,
            location: props.userProfile.location,

            editToggle: true
        })
    }

    // Edit cancel
    const editProfileCancel = () => {
        setState({
            editToggle: false
        })
    }

    // Submit Edit Profile
    const editProfileSubmit = (e) => {

        const editDetails = {
            id: state.id,
            username: state.username,
            name: state.name,
            email: state.email,
            phone: state.phone,
            location: state.location,
            password: state.password
        }
        props.updateProfile(editDetails)

        setState({
            ...state,
            editToggle: false,

            id: "",
            username: "",
            name: "",
            email: "",
            phone: "",
            location: "",
            password: "",
            avatar: ""
        })

    }

    function editorSubmitEditbtn() {
        if (state.editToggle) {
            return (
                <div className="row">
                    <div className="col-6 p-1"><label /></div>
                    <div className="col-3 p-1"><p>
                        <span className="btn btn-success text-white" onClick={editProfileSubmit}>&#10004;</span>
                    </p>
                    </div>
                    <div className="col-3 "><p >
                        <span className="btn btn-danger text-white" onClick={editProfileCancel}>&#10005;</span>
                    </p>
                    </div>

                </div>
            )
        } else
            return (
                <div className="row">
                    {/* Edit profile */}
                    <div className="col-6 p-1"><label /></div>
                    <div className="col-6 p-1">
                        <p>
                            <span className="btn btn-secondary text-white" onClick={editProfileHandler}>Edit Profile</span>
                        </p>
                    </div>
                </div>

            )
    }

    // Initial Render
    function userDetails() {
        return (
            <React.Fragment>
                {/* <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab"> */}

                {editorSubmitEditbtn()}
                <br />
                {/* Title and value */}
                <div className="row">
                    <div className="col-6 p-1"><label>Username</label></div>
                    <div className="col-6 p-1"><p>{props.userProfile.username}</p></div>
                </div>
                <div className="row">
                    <div className="col-6 p-1"><label>Name</label></div>
                    <div className="col-6 p-1"><p>{props.userProfile.name}</p></div>
                </div>
                <div className="row">
                    <div className="col-6 p-1"><label>Email</label></div>
                    <div className="col-6 p-1"><p>{props.userProfile.email}</p></div>
                </div>
                <div className="row">
                    <div className="col-6 p-1"><label>Phone</label></div>
                    <div className="col-6 p-1"><p>{props.userProfile.phone}</p></div>
                </div>
                <div className="row">
                    <div className="col-6 p-1"><label>Location</label></div>
                    <div className="col-6 p-1"><p>{props.userProfile.location}</p></div>
                </div>
                <div className="row">
                    <div className="col-6 p-1"><label>Last Booking Date</label></div>
                    <div className="col-6 p-1"><p>12 Dec 2019</p></div>
                </div>
            </React.Fragment>

        )
    }

    // on edit toggle
    function editUserDetails() {
        return (
            <React.Fragment>
                {/* edit button type */}
                {editorSubmitEditbtn()}
                <br />

                {/* Title and value */}
                {/* Username */}
                <div className="row">
                    <div className="col-6 p-1"><label>Username</label></div>
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
                                <Button variant="outline-secondary" onClick={passwordShowBtn}><MdRemoveRedEye /></Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </div>
                </div>
                {/* Last Booking Date */}
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Last Booking Date</label></div>
                    <div className="col-6 p-1"><p>12 Dec 2019</p></div>
                </div>
            </React.Fragment>

        )
    }

    function bookingStatus() {
        return (
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                {/* Cancle Button */}
                <div className="row">
                    <div className="col-6 p-1">
                        <label></label>
                    </div>
                    <div className="col-6 p-1">
                        <p ><span className="btn btn-danger text-white" onClick={
                            () => {
                                props.cancleServicing(props.userBike._id)
                            }
                        }>Cancel Booking</span></p>
                    </div>
                </div>
                <div className="row mb-4">

                </div>
                <div className="row">

                    <div className="col-6 p-1">
                        <label>Booking Status</label>
                    </div>
                    <div className="col-6 p-1">
                        {/* Color code based on booking status from props */}
                        <p ><span className={
                            props.bookingDetails.bookingStatus == 1 ? 'text-warning' :
                                (props.bookingDetails.bookingStatus == 2 ? 'text-success' : 'text-secondary')}>
                            {
                                props.bookingDetails.bookingStatus == 1 ? 'In Queue' :
                                    (props.bookingDetails.bookingStatus == 2 ? 'Accepted' : 'No Booking')}
                        </span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Booking Date</label>
                    </div>
                    <div className="col-6 p-1">
                        <p><Moment format="MM/D/YYYY, hh:mm">{props.bookingDetails.bookingDate}</Moment></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Service Center</label>
                    </div>
                    <div className="col-6 p-1">
                        <p>{props.bookingDetails.serviceCenter.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Vehicle</label>
                    </div>
                    <div className="col-6 p-1">
                        <p>{props.bikeModelName}, {props.userBike.bikeNumber}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Bike Status</label>
                    </div>
                    <div className="col-6 p-1">
                        <p><span className=" text-warning p-2">Good</span></p>
                    </div>
                </div>

            </div>
        )
    }

    function bookServicing() {
        return (
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                {/* Cancle Button */}
                <ServiceCenterBook />
                <div className="row">
                    <div className="col-6 p-1">
                    </div>
                    <div className="col-6 p-1">
                        <p ><a href="/bike" className="btn btn-secondary text-white">Edit Bike</a></p>
                    </div>
                </div>
                <div className="row mb-4">

                </div>
                {/* Booking Status */}
                <div className="row">

                    <div className="col-6 p-1">
                        <label>Booking Status</label>
                    </div>
                    <div className="col-6 p-1">
                        <p ><span className="text-secondary">Not Booked</span></p>
                    </div>
                </div>
                {/* Bike Number */}
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Bike Number</label>
                    </div>
                    <div className="col-6 p-1">
                        <p>{props.userBike.bikeNumber}</p>
                    </div>
                </div>
                {/* Bike Model */}
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Bike Model</label>
                    </div>
                    <div className="col-6 p-1">
                        <p>{props.bikeModelName}</p>
                    </div>
                </div>
                {/* Odometer */}
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Odometer (K.M run)</label>
                    </div>
                    <div className="col-6 p-1 text-info">
                        <p className="text-info">{props.userBike.odometer}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 p-1">
                        <label>Total Online Servicing Booked Till Date</label>
                    </div>
                    <div className="col-6 p-1">
                        <p>11</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-1">
                        <label>Bike Status</label>
                    </div>
                    <div className="col-6 p-1">
                        <p><span className=" text-warning">Good</span></p>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="container emp-profile shadow">

            <form method="post">
                {/* upload photo and Title Row */}
                <div className="row">
                    {/* Upload photo */}
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={props.userProfile.avatar} alt="" style={{ maxHeight: '20vh', maxWidth: '20vh' }} />
                            <div className="file btn btn-lg btn-primary">
                                Upload Photo
                            <input type="file" name="file" />
                            </div>
                        </div>
                    </div>
                    {/* top right div */}
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5 style={{ textTransform: 'uppercase' }}>
                                {props.userProfile.name}
                            </h5>

                            <p className="proile-rating">BOOKING RANKINGS : <span>8/40</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Booking Status</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom div */}
                <div className="row" >
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-8">
                        <Alert />
                        <div className="tab-content profile-tab ml-3" id="myTabContent">
                            <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">

                                {state.editToggle ? editUserDetails() : userDetails()}
                            </div>

                            {props.bookingDetails.bookingStatus === 1 || props.bookingDetails.bookingStatus === 2 ?
                                bookingStatus() : bookServicing()}
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    getUserBike: PropTypes.func.isRequired,
    getBooking: PropTypes.func.isRequired,
    cancleServicing: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userProfile: state.profile.userProfile,
    userBike: state.userBike.userBike,
    bikeModelName: state.userBike.bikeModelName,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    authStatus: state.auth.authStatus,

    bookingDetails: state.booking.bookingDetails
})

export default connect(mapStateToProps,
    { getUserBike, getProfile, getBooking, cancleServicing, updateProfile })
    (Profile)