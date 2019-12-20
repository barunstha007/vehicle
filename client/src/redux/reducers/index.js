import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import serviceCenterList from './serviceCenterList'
import admin from './admin'
import superadmin from './superadmin'

export default combineReducers({
    alert,
    auth,
    serviceCenterList,
    admin,
    superadmin
})