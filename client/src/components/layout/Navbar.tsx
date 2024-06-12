import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const NavBar = (): React.JSX.Element => {
    return <>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/"><img
                    alt=""
                    src="/logo.svg"
                    width="50"
                    height="50"
                    className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto container-fluid">
                        <Nav.Link as={Link} to="/calculator">Trade Up Calculator</Nav.Link>
                        <Nav.Link as={Link} to="/best">Best Trade Ups</Nav.Link>
                        {/* <Nav.Link className="ms-auto" as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;