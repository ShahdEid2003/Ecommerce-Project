import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className=" sticky-top bg-body-tertiary">
      <Container>
        <Navbar.Brand >T-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={'login'}>Login</Nav.Link>
            <Nav.Link as={Link} to={'register'}>Register</Nav.Link>
            
      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
