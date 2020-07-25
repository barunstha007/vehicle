import React, { useState } from 'react'
import { FaCalendarCheck, FaFlagCheckered } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';
import "react-datepicker/dist/react-datepicker.css";
import './AdminHome.css'
import CurrentBooking from './CurrentBooking'

export default function AdminHome() {


    return (
        <React.Fragment>
            <CurrentBooking />
        </React.Fragment>
    )
}
