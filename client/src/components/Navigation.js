import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/auth'

function Navigation(props) {

    const authLinks = (
        <Navbar.Text>
            <a onClick={props.logout} href="#!">logout</a>
        </Navbar.Text>
    )

    const guestLinks = (
        <Navbar.Text>
            <a href="/Login">login</a>
        </Navbar.Text>
    )

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/"> Service Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" expand={768} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/current">Servicing</Nav.Link>
                    <Nav.Link href="/inqueue">Queue</Nav.Link>
                    <Nav.Link href="/config">BookingConfig</Nav.Link>
                    <Nav.Link href="/bikemodel-list">Bike Models</Nav.Link>
                    <Nav.Link href="/service-centers">Service Centers</Nav.Link>
                    <Nav.Link href="/bike">Bike</Nav.Link>

                    {/* <Nav.Link href="/admin-users">Power Users</Nav.Link> */}
                    <NavDropdown title="Users" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/superadminlists">Superadmin</NavDropdown.Item>
                        <NavDropdown.Item href="/adminlists">Admin</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                {props.auth.isAuthenticated ? authLinks : guestLinks}

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