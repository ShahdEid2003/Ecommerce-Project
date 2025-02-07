import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import axios from "axios";
export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products/${productId}`
  );
  if (isLoading) {
    return <Loader />;
  }
  const addProductToCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          }
        }
      );
      if (response.status == 201) {
        toast.success("Product added to cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate('/cart');
      }
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <div className="container text-center p-3">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <div className=" shadow p-3">
              <h4>{data.product.name}</h4>
              <img src={data.product.mainImage.secure_url} />
              <p>{data.product.description}</p>
              <h5>Price: ${data.product.price}</h5>
              <button onClick={addProductToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
