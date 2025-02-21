import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBarProfile({ open, handleClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}
            onClick={(e) => e.stopPropagation()} 
          >
            <Sidebar collapsed={isCollapsed} className="vh-100">
              <button className="close-btn" onClick={handleClose}>
                ✖
              </button>
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
                <MenuItem component={<Link to="info" />}>
                  Account Information
                </MenuItem>
                <MenuItem component={<Link to="image" />}>
                  Profile image
                </MenuItem>
                <MenuItem component={<Link to="order" />}>Orders</MenuItem>
              </Menu>
            </Sidebar>
          </div>
        </div>
      )}
    </>
  );
}
