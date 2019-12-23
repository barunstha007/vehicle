import React from 'react'
import "./Profile.css"

export default function Profile() {
    return (
        <div class="container emp-profile shadow">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            <div class="file btn btn-lg btn-primary">
                                Upload Photo
                                <input type="file" name="file" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                            <h5>
                                Shriti Rai
                                    </h5>
                            {/* <h6>
                                Web Developer and Designer
                                    </h6> */}
                            <p class="proile-rating">BOOKING RANKINGS : <span>8/40</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Booking Status</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                    </div> */}
                </div>
                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab ml-3" id="myTabContent">
                            <div class="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label></label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p ><span className="btn btn-secondary text-white">Edit Profile</span></p>
                                    </div>
                                </div><br />
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Username</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>Shriti123</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Name</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>Shriti Rai</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Email</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>shritirai55@gmail.com</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Phone</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>981 456 7890</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Location</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>Chahabil, Sherpa-Road 11 </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Last Booking Date</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>12 Dec 2019</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                {/* Cancle Button */}
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label></label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p ><span className="btn btn-danger text-white">Cancel Booking</span></p>
                                    </div>
                                </div>
                                <div class="row mb-4">

                                </div>
                                <div class="row">

                                    <div class="col-6 p-1">
                                        <label>Booking Status</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p ><span className="text-success">Accepted</span></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Booking Date</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>12 Dec 2019, 1:00PM</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Total Online Servicing Booked Till Date</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>11</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Vehicle</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p>Vespa SXL MATTE 125</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 p-1">
                                        <label>Bike Status</label>
                                    </div>
                                    <div class="col-6 p-1">
                                        <p><span className=" text-warning p-2">Good</span></p>
                                    </div>
                                </div>
                                {/* <div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br />
                                        <p>Your detail description</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
