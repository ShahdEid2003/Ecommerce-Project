import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/loader";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce-node4.onrender.com/order",
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      setOrders(response.data.orders);
      console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    <Loader />;
  }
  useEffect(() => {
    getOrders();
  }, []);
  const handleCancelOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success("Order cancelled successfully! ");
    } catch (error) {
      console.log("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <>
      <Container className="ms-4">
        <h1 className="text-center mb-4">Orders</h1>
        <h2 className="mb-4 fw-bold">Orders List</h2>
        {orders.length === 0 ? (
          <p className="fw-bold">No orders available.</p>
        ) : (
          <Row className="g-5">
            {orders.map((order) => (
              <Col md={3} lg={5} key={order._id}>
                <div className="border p-3 rounded shadow-sm bg-white h-100">
                  <p className="fw-bold mb-1">Address:</p>
                  <p>{order.address}</p>
                  <p className="fw-bold mb-1">Final Price:</p>
                  <p>${order.finalPrice}</p>
                  <p className="fw-bold mb-1">Payment Type:</p>
                  <p>{order.paymentType}</p>
                  <p className="fw-bold mb-1">Phone:</p>
                  <p>{order.phoneNumber}</p>
                  <p className="fw-bold mb-1">Status:</p>
                  <Badge
                    bg={order.status === "pending" ? "warning" : "success"}
                    className="mb-2"
                  >
                    {order.status}
                  </Badge>
                  <h6 className="fw-bold mt-3">Products:</h6>
                  <ul className="list-unstyled">
                    {order.products.map((product) => (
                      <li className="p-2 border-bottom" key={product._id}>
                        {product.quantity}x{" "}
                        {product.productId?.name || "Unknown Product"} - $
                        {product.finalPrice}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted small mt-2">
                    Created at: {new Date(order.createdAt).toLocaleString()}
                  </p>

                  {order.status === "pending" && (
                    <button
                      className="btn btn-danger w-50 mt-3"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        )}
   
      </Container>
    </>
  );
}
