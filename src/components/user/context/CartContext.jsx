import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const cartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const getCart = async () => {
    const response = await axios.get(
      `https://ecommerce-node4.onrender.com/cart`,
      {
        headers: {
          Authorization: `Tariq__${localStorage.getItem("userToken")}`,
        },
      }
    );
    setCartCount(response.data.count);
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount , setCartCount}}>
      {children}
    </CartContext.Provider>
  );
};

export default cartContextProvider;
