import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { InputGroup, Button } from 'react-bootstrap'
import { MdRemoveRedEye } from 'react-icons/md'

//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getProfile, updateProfile } from '../redux/actions/profile'
import Alert from '../layout/Alert'

function Profile(props) {

    useEffect(() => {
        props.getProfile()

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
                <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">

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
                </div>

                {/* Booking Tab */}
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {/* Cancle Button */}
                    <div className="row">
                        <div className="col-6 p-1">
                            <label></label>
                        </div>
                        <div className="col-6 p-1">
                            <p ><span className="btn btn-danger text-white">Cancel Booking</span></p>
                        </div>
                    </div>
                    <div className="row mb-4">

                    </div>
                    <div className="row">

                        <div className="col-6 p-1">
                            <label>Booking Status</label>
                        </div>
                        <div className="col-6 p-1">
                            <p ><span className="text-success">Accepted</span></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-1">
                            <label>Booking Date</label>
                        </div>
                        <div className="col-6 p-1">
                            <p>12 Dec 2019, 1:00PM</p>
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
                            <label>Vehicle</label>
                        </div>
                        <div className="col-6 p-1">
                            <p>Vespa SXL MATTE 125</p>
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
            </React.Fragment>

        )
    }

    // on edit toggle
    function editUserDetails() {
        return (
            <React.Fragment>
                <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
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
                </div>

                {/* Booking Status */}
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {/* Cancle Button */}
                    <div className="row">
                        <div className="col-6 p-1">
                            <label></label>
                        </div>
                        <div className="col-6 p-1">
                            <p ><span className="btn btn-danger text-white">Cancel Booking</span></p>
                        </div>
                    </div>
                    <div className="row mb-4">

                    </div>
                    <div className="row">

                        <div className="col-6 p-1">
                            <label>Booking Status</label>
                        </div>
                        <div className="col-6 p-1">
                            <p ><span className="text-success">Accepted</span></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-1">
                            <label>Booking Date</label>
                        </div>
                        <div className="col-6 p-1">
                            <p>12 Dec 2019, 1:00PM</p>
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
                            <label>Vehicle</label>
                        </div>
                        <div className="col-6 p-1">
                            <p>Vespa SXL MATTE 125</p>
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
            </React.Fragment>

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
                            {state.editToggle ? editUserDetails() : userDetails()}
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    userProfile: state.profile.userProfile,
    isAuthenticated: state.auth.isAuthenticated,
    authStatus: state.auth.authStatus
})

export default connect(mapStateToProps, { getProfile, updateProfile })(Profile)