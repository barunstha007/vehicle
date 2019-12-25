import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import serviceCenterList from './serviceCenterList'
import admin from './admin'
import superadmin from './superadmin'
import profile from './profile'
import bikeModel from './bikeModel'

export default combineReducers({
    alert,
    auth,
    serviceCenterList,
    admin,
    superadmin,
    profile,
    bikeModel
})