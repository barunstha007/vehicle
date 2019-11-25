import React from 'react';
import './App.css';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login'
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CurrentBooking from './components/CurrentBooking';
import Home from './components/Home';
import Inqueue from './components/InQueue';
import Config from './components/Config';
import ServiceCenter from './components/ServiceLocation'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/current">
            <CurrentBooking />
          </Route>
          <Route path="/inqueue">
            <Inqueue />
          </Route>
          <Route path="/service_center">
            <ServiceCenter />
          </Route>
          <Route path="/config">
            <Config />
          </Route>
          <Route path="/list">
            <Inqueue />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <UserRegistration />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
