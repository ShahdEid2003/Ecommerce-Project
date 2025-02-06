import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { Link } from "react-router-dom";

export default function Categories() {
    const { data, error, isLoading } = UseFetch(`https://ecommerce-node4.onrender.com/categories/active`)
    if (isLoading) {
        return <Loader />;
    }
  return (
    <>
    {error ? <div className="alert alert-danger">{error}</div> : ""}
      <h2 className="text-center m-5">Categories</h2>
      <div className="container text-center p-3">
        <div className="row">
          {data.categories.map((category) => (
            <div className="col-md-4" key={category._id}>
              <div className="category shadow p-3 rounded h-100">
                <img src={category.image.secure_url} alt="Category" />
                <Link to={`/categories/${category._id}`} className="text-decoration-none fw-bold">show products</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
