import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { Link } from "react-router-dom";
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";

import { Button } from "react-bootstrap";

export default function Categories() {
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/categories/active`
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <MainVeiw title={"Categories"} subtitle={"Home/Categories"} />
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <div className="container text-center p-3">
        <div className="row gy-5">
          {data.categories.map((category) => (
            <div className="col-sm-6 col-md-3" key={category._id}>
              <div className="category shadow p-3 rounded ">
                <img
                  src={category.image.secure_url}
                  alt="Category"
                  className="img-fluid w-100"
                />
                <Link
                  to={`/categories/${category._id}`}
                  className="text-decoration-none fw-bold btnOrange "
                >
                  show products
                </Link>        
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
