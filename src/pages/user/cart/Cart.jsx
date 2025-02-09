import React from "react";
import Loader from "../../../components/loader/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function Cart() {
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
    const token=localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
      {
        productId: productId
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        }
      }
    );
    console.log(response);
  };
  const decreasQty = async (productId) => {
    const token=localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
      {
        productId: productId
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        }
      }
    );
    console.log(response);
  };
  return (
    <section className="cart">
      <h2 className="text-center">Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.details.mainImage.secure_url} width="50px" />
              </td>
              <td>{item.details.name}</td>
              <td>{item.details.finalPrice}$</td>
              <td>
                {item.quantity}
                <Button onClick={() => increaseQty(item.productId)}>+</Button>
                <Button onClick={()=>decreasQty(item.productId)} >-</Button>
              </td>
              <td>{item.quantity * item.details.finalPrice}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
