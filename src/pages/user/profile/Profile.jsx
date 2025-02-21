import React, { useState } from "react";
import SideBarProfile from "../../../components/user/sidebar/SideBarProfile";
import { Outlet } from "react-router-dom";
import { FaList } from "react-icons/fa";
import "./profile.css";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className=" btnOrange mt-4 mb-2  iconList "
        >
          <FaList size={30} />
        </button>
        <SideBarProfile open={isOpen} handleClose={() => setIsOpen(false)} />
      </div>
      <Outlet />
    </>
  );
}
