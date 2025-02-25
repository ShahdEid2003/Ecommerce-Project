import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/user/context/CartContext";
import "./Products.css";
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";
import { FaRegFrownOpen } from "react-icons/fa";
import ScrollTop from "../../../components/ScrollTop";

export default function CategoryProduct() {
  const { categoryId } = useParams();
  const [sortOption, setSortOption] = useState("Price (Low - High)");
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);

  const { data, error, isLoading } = UseFetch(
    `${import.meta.env.VITE_BURL}/products/category/${categoryId}`
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const sortedProducts = [...data.products].sort((a, b) => {
    if (sortOption === "Price (Low - High)") {
      return a.price - b.price;
    } else if (sortOption === "Price (High - Low)") {
      return b.price - a.price;
    }
    return 0;
  });

  const addProductToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/cart`,
        { productId: productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (response.status === 201) {
        toast.success("Product added to cart");
        navigate("/cart");
        setCartCount(cartCount + 1);
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <>
    <ScrollTop />
      <MainVeiw title={"Products"} subtitle={"Home/category/products"} />
      <div className="container-fluid">
        <div className="sort d-flex justify-content-between align-items-center p-2">
          <span className="text-sm">
            Showing <span className="fw-bold">{sortedProducts.length}</span> products
          </span>
          <div className="flex items-center">
            <label htmlFor="sort" className="fw-bold me-2">Sort by</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="selector rounded px-2 py-1"
            >
              <option>Price (Low - High)</option>
              <option>Price (High - Low)</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center">
            <FaRegFrownOpen className="mt-5 mb-3 mainColor" size={100} />
            <p className="text-muted fw-bold ">No products available for this category!</p>
          </div>
        ) : (
          <div className="container-fluid text-center">
            <div className="row gap-3 d-flex justify-content-center ">
              {sortedProducts.map((product) => (
                <div className="col-12 col-sm-6 col-md-3 gy-3 gap-3 p-2" key={product._id}>
                  <div className="product shadow p-3 h-100">
                    <img src={product.mainImage.secure_url} alt="product" className="img-fluid"/>
                    <div>
                      <p className="product-name">{product.name}</p>
                      {product.discount > 0 ? (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <p className="m-0 original-price text-danger text-decoration-line-through">
                            ${product.price}
                          </p>
                          <p className="discounted-price">${product.finalPrice}</p>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <p className="discounted-price">${product.finalPrice}</p>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Link to={`/product/${product._id}`} className="text-decoration-none btnOrange">
                        Details
                      </Link>
                      <div className="text-center">
                        <button onClick={() => addProductToCart(product._id)} className="btnOrange">
                          <MdShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
