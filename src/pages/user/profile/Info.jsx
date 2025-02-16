import React, { useContext } from "react";
import { UserContext } from "../../../components/user/context/UserContext";
import Loader from "../../../components/loader/loader";
export default function info() {
  const { user, loading } = useContext(UserContext);
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="p-5 ms-3">
        <p>User Name: {user.userName}</p>
        <p>Email:{user.email}</p>
        
      </section>
    </>
  );
}
