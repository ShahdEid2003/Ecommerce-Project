import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white py-5 mt-5">
        <Container>
          <Row className="g-4">
            <Col sm={4} md={3}>
              <h5>ABOUT US</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="social-icons">
                <FaFacebookF />
                <FaTwitter />
                <FaLinkedinIn />
                <FaYoutube />
                <FaPinterest />
              </div>
            </Col>

            <Col sm={4} md={3}>
              <h5>INFORMATION</h5>
              <ul className="list-unstyled">
                <li>About Us</li>
                <li>Manufacturers</li>
                <li>Tracking Order</li>
                <li>Privacy & Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </Col>

            <Col sm={4} md={3}>
              <h5>MY ACCOUNT</h5>
              <ul className="list-unstyled">
                <li>Login</li>
                <li>My Cart</li>
                <li>Wishlist</li>
                <li>Compare</li>
                <li>My Account</li>
              </ul>
            </Col>

            <Col sm={4} md={3}>
              <h5>NEWSLETTER</h5>
              <Form className="newsletter-box">
                <Form.Control
                  type="email"
                  placeholder="Enter E-Mail Address"
                  className="mb-2"
                />
                <Button className="w-70">
                  <FaTelegramPlane /> Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
