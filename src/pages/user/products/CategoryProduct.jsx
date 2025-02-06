import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CategoryProduct() {
  const { categoryId } = useParams();
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products/category/${categoryId}`
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <h2 className="text-center m-5">Products</h2>
      <div className="container text-center p-3">
        <div className="row">
          {data.products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="product shadow p-3 rounded h-100">
                <img src={product.mainImage.secure_url} alt="product" />
                <p className="fw-bold">{product.name}</p>
                <Link to={`/product/${product._id}`} className="text-decoration-none fw-bold">show product details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
