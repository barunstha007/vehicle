import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/">KTM Service Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" expand={768} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/current">Servicing</Nav.Link>
                    <Nav.Link href="/inqueue">Queue</Nav.Link>
                    <Nav.Link href="/config">BookingConfig</Nav.Link>

                    <Nav.Link href="/service-centers">Service Centers</Nav.Link>
                    <Nav.Link href="/admin-users">Power Users</Nav.Link>
                </Nav>
                <Navbar.Text>
                    <a href="/Login">login</a>
                </Navbar.Text>

            </Navbar.Collapse>
        </Navbar >
    )
}
