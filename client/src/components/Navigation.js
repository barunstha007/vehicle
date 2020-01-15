import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
        if (authStatus == 1) {
            return (
                <React.Fragment>
                    <Nav.Link href="/bikemodel-list">Bike Models</Nav.Link>
                    <Nav.Link href="/service-centers">Service Centers</Nav.Link>

                    <NavDropdown title="Users" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/superadminlists">Superadmin</NavDropdown.Item>
                        <NavDropdown.Item href="/adminlists">Admin</NavDropdown.Item>
                    </NavDropdown>
                </React.Fragment>
            )
        }
        if (authStatus == 2) {
            return (
                <React.Fragment>
                    <Nav.Link href="/current">Servicing</Nav.Link>
                    <Nav.Link href="/inqueue">Queue</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </React.Fragment>
            )
        }
        if (authStatus == 3) {
            return (
                <React.Fragment>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </React.Fragment>
            )
        }
    }

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/"> Service Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" expand={768} />
            <Navbar.Collapse id="basic-navbar-nav">
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