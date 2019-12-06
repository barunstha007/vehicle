import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Public
import UserRegistration from './components/UserRegistration';
import Login from './components/Login'
import Navigation from './components/Navigation';
// Admin
import CurrentBooking from './components/Admin/CurrentBooking';
import Home from './components/Home';
import Inqueue from './components/Admin/InQueue';
import Config from './components/Admin/Config';
import AdminHome from './components/Admin/AdminHome'

// Super Users
import ServiceCenter from './components/Superadmin/ServiceLocation'
import AdminUsers from './components/Superadmin/AdminUsers'


// Redux
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">

        <Router>
          <Navigation />
          <Switch>
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
            <Route path="/admin-users">
              <AdminUsers />
            </Route>
            <Route path="/config">
              <Config />
            </Route>
            <Route path="/list">
              <Inqueue />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
