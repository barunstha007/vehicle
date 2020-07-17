import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/auth'

function Navigation({ auth: { isAuthenticated, authStatus, loading }, logout }) {

    const authLinks = (
        <Navbar.Text>
            <a onClick={logout} href="#!">logout</a>
        </Navbar.Text>
    )

    const guestLinks = (
        <Navbar.Text>
            <a href="/Login">login</a>
        </Navbar.Text>
    )

    function userRoleBasedNav() {
        if (authStatus === 1) {
            return (
                <React.Fragment>
                    <NavDropdown title="Users" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/superadminlists">Superadmin</NavDropdown.Item>
                        <NavDropdown.Item href="/adminlists">Admin</NavDropdown.Item>
                    </NavDropdown>

                    <NavLink
                        to="/bikemodel-list"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Bike Models
                     </NavLink>
                    <NavLink
                        to="/service-centers"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Service Centers
                     </NavLink>


                    <NavLink
                        to="/current-status"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Current Status
                     </NavLink>
                </React.Fragment>
            )
        }
        if (authStatus === 2) {
            return (
                <React.Fragment>
                    <NavLink
                        to="/dashboard"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Dashboard
                     </NavLink>
                    <NavLink
                        to="/current"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Servicing
                     </NavLink>
                    <NavLink
                        to="/inqueue"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Queue
                     </NavLink>
                </React.Fragment>
            )
        }
        if (authStatus === 3) {
            return (
                <React.Fragment>
                    <NavLink
                        to="/profile"
                        activeStyle={{ color: 'black', backgroundColor: 'cyan' }}
                        activeClassName="/dashboard"
                        className="nav-link">
                        Profile
                     </NavLink>
                </React.Fragment>
            )
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/"> Service Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" expand={768} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text className="mr-2">
                    <a href="/packages">Packages</a>
                </Navbar.Text>
                <Nav className="mr-auto">
                    {userRoleBasedNav()}
                </Nav>
                {!loading && (<React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>)}
            </Navbar.Collapse>
        </Navbar >
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navigation)