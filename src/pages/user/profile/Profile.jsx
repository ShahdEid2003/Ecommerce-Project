import React from "react";
import SideBarProfile from "../../../components/user/sidebar/SideBarProfile";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function Profile() {
  return (
    <>
      <Row>
        <Col md={3}>
          <SideBarProfile />
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
