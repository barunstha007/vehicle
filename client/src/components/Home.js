import React from 'react'
import { FaCalendarCheck, FaFlagCheckered } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css'
import ServiceCenterBook from '../layout/ServiceCenterBook';
import Banner from '../assets/parts-banner.jpg'

export default function Home() {

    return (
        <React.Fragment>
            <section class="img-container">
                <div class="container">
                    <div class="row" style={{ top: '20%', position: 'absolute' }}>
                        <div class="card shadow" style={{ background: 'rgba(0,0,0,0.7)', height: '30vh ' }}>
                            <div class="card-body" style={{ width: '26rem' }}>
                                <div class="row">
                                    <div class="col-md-12 ">
                                        <h3 className="text-white">Available Service Centers</h3>
                                        <hr />
                                        <ServiceCenterBook />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card views */}
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-12 h-auto ">
                        <div className="box-part text-center shadow " style={{ height: '17rem' }}>
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
                        <div className="box-part text-center shadow" style={{ height: '17rem' }}>
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
                        <div className="box-part text-center shadow" style={{ height: '17rem' }}>

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
