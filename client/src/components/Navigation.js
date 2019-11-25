import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


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

                    <Nav.Link href="/service_center">Service Centers</Nav.Link>
                    <Nav.Link href="/login" style={{ color: '#000' }}>Login</Nav.Link>

                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar >
    )
}
