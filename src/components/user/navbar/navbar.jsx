import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink'
import { Link } from "react-router-dom";

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className=" sticky-top bg-body-tertiary">
      <Container>
        <Navbar.Brand>T-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"product"}>
              product
            </Nav.Link>
            <Nav.Link as={Link} to={"category"}>
              category
            </Nav.Link>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>login</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"auth/register"}>
                  sign up
                </Dropdown.Item>

                <Dropdown.Item as={Link} to={"auth/login"}>
                  login
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
