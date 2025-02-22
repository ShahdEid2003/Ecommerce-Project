import React from "react";
import Loader from "../../../components/loader/loader";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CiCircleRemove } from "react-icons/ci";
import { BsBagX } from "react-icons/bs";
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";

import "./Cart.css";
import { CartContext } from "../../../components/user/context/CartContext";
import { Link } from "react-router-dom";
export default function Cart() {
  const { cartCount, setCartCount } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      setCart(data.products);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  const increaseQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
    console.log(response);
  };
  const decreasQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
    console.log(response);
  };
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/removeItem`,
        {
          productId: productId,
        },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
      setCartCount(cartCount - 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/clear",
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart([]);
      setCartCount(0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainVeiw title={"Cart"} subtitle={"Home/cart"} />
      <section className="cart">
        <div className="cart-container mt-1">
          <h2 className="text-center">Your Cart</h2>
          <Table className="cart-table" striped bordered hover>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <BsBagX size={150} color="orangered" className="m-3" />
                    <p className="text-muted">Your cart is empty</p>
                  </td>
                </tr>
              ) : (
                <>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.details.mainImage.secure_url}
                          width="70px"
                        />
                      </td>
                      <td>{item.details.name}</td>
                      <td>{item.details.finalPrice}$</td>
                      <td className="qytcell">
                        <button
                          className="qty-btn"
                          onClick={() => decreasQty(item.productId)}
                        >
                          -
                        </button>
                        <span className="qty">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => increaseQty(item.productId)}
                        >
                          +
                        </button>
                      </td>
                      <td>{item.quantity * item.details.finalPrice}$</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.productId)}
                        >
                          <CiCircleRemove />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </div>
        <div className="cart-footer cart-container">
          <div className="coupon-form">
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter your coupon code if you have one"
            />
            <button className="apply-coupon">Apply Coupon</button>
          </div>

          <div className="cart-actions ">
            <button className="clear-cart" onClick={clearCart}>
              CLEAR CART
            </button>
            {cart.length > 0 && (
              <Button className="checkout " as={Link} to={"/create-order"}>
                PROCEED TO CHECKOUT
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
