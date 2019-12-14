import React from 'react'
import { FaCalendarCheck, FaFlagCheckered } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css'
import ServiceCenterBook from '../layout/ServiceCenterBook';

export default function Home() {

    return (
        <React.Fragment>
            <div className="jumbotron img-container">
                <h3 className="display-4">Book Servicing <br /> Remotely</h3>
                <p className="text-primary"><strong>Available Servicing Locations:</strong></p>
                {/* Smart Component */}
                <ServiceCenterBook />

            </div>

            <div className="container">
                <div className="row h-10">
                    <div className="col-lg-4 col-md-12 h-auto">
                        <div className="box-part text-center ">
                            <FaCalendarCheck size='30' color='red' />
                            <div className="card-title title">
                                <h4>Book Servicing Remotely</h4>
                            </div>
                            <div className="text">
                                <span>
                                    Book for servicing queue remotely for any service center from anywhere you are
                                    and wait for the admin to queue you up
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="box-part text-center">
                            <IoIosTime size='30' color='blue' />
                            <div className="card-title title">
                                <h4>Get Queued Up</h4>
                            </div>
                            <div className="text">
                                <span>
                                    Wait for the admin to queue you up and return the
                                    estimated checkin time for you to arrive with your vehicle
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 h-25">
                        <div className="box-part text-center">

                            <FaFlagCheckered size='30' color='green' />
                            <div className="card-title title">
                                <h4>Arrive at your Time</h4>
                            </div>
                            <div className="text">
                                <span>After getting your checkin time, arrive at your estimated time
                                     and complete the process</span>
                            </div>
                        </div>
                    </div>
                </div></div></React.Fragment>
    )
}
