import React, { useState, useContext } from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/user/context/CartContext";
import { MdOutlineCloudDownload } from "react-icons/md";
export default function Products() {
  const [sortOption, setSortOption] = useState("Price (Low - High)");
  const [visibleProducts, setVisibleProducts] = useState(4);
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);

  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products?page=1&limit=50`
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
        `https://ecommerce-node4.onrender.com/cart`,
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
      <h4 className="fw-bold mb-3">All products</h4>
      <div className="container-fluid">
        <div className="sort d-flex justify-content-between align-items-center p-2">
          <span>
            Showing {Math.min(visibleProducts, sortedProducts.length)} of{" "}
            {sortedProducts.length} products
          </span>
          <div>
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Price (Low - High)</option>
              <option>Price (High - Low)</option>
            </select>
          </div>
        </div>

        <div className="row">
          {sortedProducts.slice(0, visibleProducts).map((product) => (
            <div
              className="col-12 col-sm-6 col-md-3 gy-3 p-2"
              key={product._id}
            >
              <div className="product shadow p-3  h-100">
                <img src={product.mainImage.secure_url} alt="product" />
                <div>
                  <p className="fw-bold text-center">{product.name}</p>
                  {product.discount > 0 ? (
                    <div className="d-flex justify-content-center algin-items-center gap-2">
                      <p className="m-0 original-price text-danger text-decoration-line-through">
                        ${product.price}
                      </p>
                      <p className=" discounted-price">${product.finalPrice}</p>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center algin-items-center gap-2">
                      <p className="discounted-price">${product.finalPrice}</p>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center algin-items-center gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none btnOrange fw-bold"
                  >
                    Details
                  </Link>
                  <div className="text-center ">
                    <button
                      onClick={() => addProductToCart(product._id)}
                      className="btnOrange "
                    >
                      <MdShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < sortedProducts.length && (
          <div className="text-center mt-3">
            <button
              onClick={() => setVisibleProducts(visibleProducts + 4)}
              className=" fw-bold btnOrange"
            >
              Load More <MdOutlineCloudDownload />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
