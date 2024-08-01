import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const NavBar = (): React.JSX.Element => {
    return <>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/"><img
                    alt=""
                    src="../../../public/logo.svg"
                    width="50"
                    height="50"
                    className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto container-fluid">
                        <Nav.Link as={Link} to="/trade-up">Calculator</Nav.Link>
                        <Nav.Link as={Link} to="/top">Top Trade Ups</Nav.Link>
                        <Nav.Link className="ms-auto disabled" as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link className="disabled" as={Link} to="/login">Login</Nav.Link>
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <NavDropdown.Item className="disabled" as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item className="disabled" as={Link} to="/settings">Settings</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;