import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import serviceCenterList from './serviceCenterList'
import admin from './admin'
import superadmin from './superadmin'
import profile from './profile'
import bikeModel from './bikeModel'
import userBike from './userBike'
import dashboard from './dashboard'
import booking from './booking'
import packages from './packages'

export default combineReducers({
    alert,
    auth,
    serviceCenterList,
    admin,
    superadmin,
    profile,
    bikeModel,
    userBike,
    dashboard,
    booking,
    packages
})