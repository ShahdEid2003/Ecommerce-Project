import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  const { productId } = useParams();
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products/${productId}`
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <div className="container text-center p-3">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <div className=" shadow p-3">
              <h4>{data.product.name}</h4>
              <img src={data.product.mainImage.secure_url}  />
              <p>{data.product.description}</p>
              <h5>Price: ${data.product.price}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
