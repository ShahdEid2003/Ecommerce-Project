import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../../components/user/context/CartContext";
import Loader from "../../../components/loader/loader";
import MainView from "../../../components/user/mainVeiw/MainVeiw";
import "./Products.css";

export default function Products() {
  const [sortOption, setSortOption] = useState("Price (Low - High)");
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const toggleSearch = () => setShowInput(!showInput);

  const handleInputChange = (e) => setSearchText(e.target.value);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/products?page=1&limit=10&search=${searchText}`
      );
      setData(response.data.products);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const sortedProducts = [...data].sort((a, b) =>
    sortOption === "Price (Low - High)" ? a.price - b.price : b.price - a.price
  );

  const addProductToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (response.status === 201) {
        toast.success("Product added to cart");
        navigate("/cart");
        setCartCount(cartCount + 1);
      }
    } catch {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <>
      <MainView title="Products" subtitle="Home / Products" />
      <div className="container">
        <div className="sort d-flex justify-content-between align-items-center p-2 flex-wrap">
          <div>
            Showing <b>{sortedProducts.length}</b> products
          </div>
          <div className="d-flex gap-3 justify-content-center align-items-center p-2">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaSearch
                onClick={toggleSearch}
                className="mainColor"
                style={{ cursor: "pointer", marginRight: "10px" }}
              />
              {showInput && (
                <input
                  type="text"
                  value={searchText}
                  onChange={handleInputChange}
                  placeholder="Write text and enter"
                  onKeyDown={(e) => e.key === "Enter" && getData()}
                />
              )}
            </div>
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
        </div>
        <div className="text-center">
          <div className="row gy-3 d-flex justify-content-center">
            {sortedProducts.map((product) => (
              <div
                className=" col-12 col-sm-6 col-md-3   gy-3 gap-3 p-2 "
                key={product._id}
              >
                <div className="product shadow p-3  h-100">
                  <img
                    src={product.mainImage.secure_url}
                    alt="product"
                    className="img-fluid"
                  />
                  <div>
                    <p className="product-name">{product.name}</p>
                    {product.discount > 0 ? (
                      <div className="d-flex justify-content-center algin-items-center gap-2">
                        <p className="m-0 original-price text-danger text-decoration-line-through">
                          ${product.price}
                        </p>
                        <p className=" discounted-price">
                          ${product.finalPrice}
                        </p>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center algin-items-center gap-2">
                        <p className="discounted-price">
                          ${product.finalPrice}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center algin-items-center gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-decoration-none btnOrange "
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
        </div>
      </div>
    </>
  );
}
