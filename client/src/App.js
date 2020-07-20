import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Public
import UserRegistration from './components/UserRegistration';
import Login from './components/Login'
import Navigation from './components/Navigation';
import Bike from './components/Bike';

// Admin
import CurrentBooking from './components/Admin/CurrentBooking';
import Home from './components/Home';
import Inqueue from './components/Admin/InQueue';
import Dashboard from './components/Admin/Dashboard';
import AdminHome from './components/Admin/AdminHome'

// Super Users
import ServiceCenter from './components/Superadmin/ServiceCenter'
import SuperAdminUsers from './components/Superadmin/SuperAdminUsers'
import AdminUsers from './components/Superadmin/AdminUsers'
import BikeModelList from './components/Superadmin/BikeModelList'
import CurrentStatus from './components/Superadmin/CurrentStatus'


// Redux
import { Provider } from 'react-redux';
import store from './redux/store'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth'
import { serviceCenterList } from './redux/actions/serviceCenterList'

import Profile from './components/Profile';
import { getUserBike } from './redux/actions/userBike';
import Packages from './components/Packages';
import CustomerMsg from './components/Messages/CustomerMsg';
import Feedbacks from './components/Admin/Feedbacks';

// If localstorage has token, set token
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    // load user (auth) action called in start of the component lifecycle
    store.dispatch(serviceCenterList())
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">

        <Router>
          <Navigation />
          <Switch>
            <Route path="/packages" exact>
              <Packages />
            </Route>
            {/* User */}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <UserRegistration />
            </Route>
            {/* Admin Home */}
            <Route path="/admin">
              <AdminHome />
            </Route>
            <Route path="/current">
              <CurrentBooking />
            </Route>
            <Route path="/inqueue">
              <Inqueue />
            </Route>
            <Route path="/service-centers">
              <ServiceCenter />
            </Route>
            <Route path="/superadminlists">
              <SuperAdminUsers />
            </Route>
            <Route path="/adminlists">
              <AdminUsers />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/list">
              <Inqueue />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/bike">
              <Bike />
            </Route>
            <Route path="/bikemodel-list">
              <BikeModelList />
            </Route>
            <Route path="/current-status">
              <CurrentStatus />
            </Route>
            <Route path="/messages">
              <CustomerMsg />
            </Route>
            <Route path="/service-center-feedbacks">
              <Feedbacks />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
