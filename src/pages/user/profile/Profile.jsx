import React from "react";
import SideBarProfile from "../../../components/user/sidebar/SideBarProfile";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import"./profile.css"

export default function Profile() {
  return (
    <>
      <Row>
        <Col md={2}>
          <SideBarProfile />
        </Col>
        <Col md={10}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
