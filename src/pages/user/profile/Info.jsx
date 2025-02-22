import React, { useContext } from "react";
import { UserContext } from "../../../components/user/context/UserContext";
import Loader from "../../../components/loader/loader";
import "./profile.css";

export default function info() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <p>Unable to fetch user information. Please try again later.</p>;
  }

  return (
    <>
    <h2  className=" text-center">Profile Information</h2>
      <div className="  p-5 container text-center d-flex flex-column  align-items-center vh-50 gap-2  ">
        
        <img
          src={user?.image?.secure_url}
          className="img-fluid img-profile"
          alt="personalImage"
        />
        <p>
          <span className="fw-bold">User Name: </span>
          {user.userName}
        </p>
        <p>
          <span className="fw-bold">Email: </span> {user.email}
        </p>
      </div>
    </>
  );
}
