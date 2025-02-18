import React, { useState, useContext } from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../../components/user/context/CartContext";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { productId } = useParams();
  const [visibleReviews, setVisibleReviews] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products/${productId}`
  );
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  const [mainImage, setMainImage] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!mainImage && data?.product?.mainImage?.secure_url) {
    setMainImage(data.product.mainImage.secure_url);
  }

  const addProductToCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
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
        navigate("/cart");
        setCartCount(cartCount + 1);
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
      <div className="container p-4 mt-5">
        <div className="row justify-content-center">
          <div className=" col-12 col-md-6">
            <div className="product-image shadow p-3 text-center">
              <img
                src={mainImage}
                className="img-fluid main-img "
                alt="Product"
              />
            </div>

            <div className="sub-images d-flex justify-content-center mt-3">
              {data.product.subImages.map((img, index) => (
                <img
                  key={index}
                  src={img.secure_url}
                  className="sub-img mx-2"
                  alt={`Sub ${index}`}
                  onClick={() => setMainImage(img.secure_url)}
                />
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6  mt-3 d-flex flex-column justify-content-start gap-3">
            <h4 className="product-name">{data.product.name}</h4>
            <div>
              {data.product.stock === 0 ? (
                <span className="badge bg-danger">out of stock</span>
              ) : (
                <span className="badge bg-success">{data.product.stock} in stock</span>
              )}
            </div>

            <div className="d-flex flex-column gap-2 mt-3">
              <div className="price-details d-flex align-items-center ">
                <h5 className=" m-0">Original Price:</h5>
                <h5 className="text-muted m-0">${data.product.price}</h5>
              </div>
              <div className="price-details d-flex align-items-center">
                <h5 className=" m-0">Discount:</h5>
                <h5 className="text-danger m-0">-${data.product.discount}</h5>
              </div>
              <div className="price-details d-flex align-items-center">
                <h5 className="mainColor m-0">Final Price:</h5>
                <h5 className="text-success m-0">${data.product.finalPrice}</h5>
              </div>
            </div>
            <div>
              <button onClick={addProductToCart} className="btnOrange mt-3 ">
              <MdShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="tabs mt-5">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </li>
          </ul>

          <div className="tab-content p-4 border rounded">
            {activeTab === "description" && (
              <div className="product-description">
                <p>{data.product.description}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews">
                <h5 className="fw-bold">Customer Reviews</h5>
                <div className="review-list mt-3">
                  {data.product.reviews.length > 0 ? (
                    data.product.reviews
                      .slice(0, visibleReviews)
                      .map((review, index) => (
                        <div
                          key={index}
                          className="review-item p-3 mb-3 rounded shadow-sm bg-light"
                        >
                          <h6 className="fw-bold mb-1">
                            {review.createdBy.userName}
                          </h6>
                          <p className="text-muted mb-2">
                            Rating:{" "}
                            {Array.from({ length: review.rating }, (_, i) => (
                              <FaStar key={i} className="mainColor" />
                            ))}
                          </p>
                          <p className="m-0">{review.comment}</p>
                        </div>
                      ))
                  ) : (
                    <p className="text-muted">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
                {visibleReviews < data.product.reviews.length && (
                  <button onClick={loadMoreReviews} className="btnOrange mt-3">
                    Load More Reviews
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
