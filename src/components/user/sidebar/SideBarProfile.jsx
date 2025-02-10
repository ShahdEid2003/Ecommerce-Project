import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
export default function SideBarProfile() {
  return (
    <>
      <Sidebar className="vh-100">
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem component={<Link to="info" />}>Info</MenuItem>
          <MenuItem component={<Link to="order" />}>Orders</MenuItem>
        </Menu>
      </Sidebar>
      
    </>
  );
}
