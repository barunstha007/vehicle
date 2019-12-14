import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import serviceCenterList from './serviceCenterList'

export default combineReducers({
    alert,
    auth,
    serviceCenterList
})