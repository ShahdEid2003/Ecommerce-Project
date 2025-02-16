import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/user/context/CartContext";
import { UserContext } from "../../../components/user/context/UserContext";

export default function CustomNavbar() {
  const { cartCount } = useContext(CartContext);
  const { user, loading, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <Navbar expand="lg" className=" sticky-top bg-white p-4 shadow">
      <Container>
        <Navbar.Brand>
          <img src="imageLogo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"about"}>
              About us
            </Nav.Link>
            <Nav.Link as={Link} to={"product"}>
              All products
            </Nav.Link>
            <Nav.Link as={Link} to={"category"}>
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to={"contact"}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"cart"}>
              Cart {cartCount}
            </Nav.Link>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>
                <i class="fa-solid fa-user"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"profile"}>
                  Welcome {loading ? "..." : user.userName}
                </Dropdown.Item>

                <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
