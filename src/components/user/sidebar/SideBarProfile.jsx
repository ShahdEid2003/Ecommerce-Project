import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { useState } from "react";

import { Link } from "react-router-dom";
export default function SideBarProfile() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
  };

  return (
    <>
       <Sidebar collapsed={isCollapsed} className="vh-100">
        
            {isCollapsed ? (
                <FaCompressArrowsAlt onClick={toggleCollapse} />
            ) : (
                <FaExpandArrowsAlt onClick={toggleCollapse} />
            )}
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
          <MenuItem component={<Link to="info" />}>Account Information</MenuItem>
          <MenuItem component={<Link to="image" />}>Profile image</MenuItem>
          <MenuItem component={<Link to="order" />}>Orders</MenuItem>
          
        </Menu>
      </Sidebar>
      
    </>
  );
}
