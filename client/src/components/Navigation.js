import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/auth";

function Navigation({
  auth: { isAuthenticated, authStatus, loading },
  logout,
}) {
  const authLinks = (
    <Navbar.Text>
      <a onClick={logout} href="#!">
        logout
      </a>
    </Navbar.Text>
  );

  const guestLinks = (
    <Navbar.Text>
      <a href="/Login">login</a>
    </Navbar.Text>
  );

  function userRoleBasedNav() {
    if (authStatus === 1) {
      return (
        <React.Fragment>
          <NavDropdown title="Users" id="basic-nav-dropdown">
            <NavDropdown.Item href="/superadminlists">
              Superadmin
            </NavDropdown.Item>
            <NavDropdown.Item href="/adminlists">Admin</NavDropdown.Item>
          </NavDropdown>

          <NavLink
            to="/bikemodel-list"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Bike Models
          </NavLink>
          <NavLink
            to="/service-centers"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Service Centers
          </NavLink>

          <NavLink
            to="/superuser-messages"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/superuser-messages"
            className="nav-link"
          >
            Admin Messages
          </NavLink>
        </React.Fragment>
      );
    }
    if (authStatus === 2) {
      return (
        <React.Fragment>
          <NavLink
            to="/dashboard"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/current"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Servicing
          </NavLink>
          <NavLink
            to="/inqueue"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Queue
          </NavLink>
          <NavLink
            to="/service-center-feedbacks"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/service-center-feedbacks"
            className="nav-link"
          >
            Feedbacks
          </NavLink>
        </React.Fragment>
      );
    }
    if (authStatus === 3) {
      return (
        <React.Fragment>
          <NavLink
            to="/profile"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/dashboard"
            className="nav-link"
          >
            Profile
          </NavLink>
          <NavLink
            to="/messages"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/messages"
            className="nav-link"
          >
            Send Feedbacks
          </NavLink>
        </React.Fragment>
      );
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/"> Service Booking</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" expand={768} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            to="/about"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/about"
            className="nav-link"
          >
            About Us
          </NavLink>
          <NavLink
            to="/packages"
            activeStyle={{ color: "black", backgroundColor: "cyan" }}
            activeClassName="/packages"
            className="nav-link"
          >
            Servicing Packages
          </NavLink>

          {userRoleBasedNav()}
        </Nav>
        {!loading && (
          <React.Fragment>
            {isAuthenticated ? authLinks : guestLinks}
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
