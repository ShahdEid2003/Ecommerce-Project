import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/loader/loader";
import { Container, Row, Col, Badge, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import './profile.css';
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

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
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `https://ecommerce-node4.onrender.com/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success("Order cancelled successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.log("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const displayedOrders = orders.slice(startIndex, endIndex);

  if (isLoading) return <Loader />;

  return (
    <>
    
     <Container className="bg-light rounded">
     <MainVeiw title={"Your Orders"} subtitle={"Home/Profile/Orders"} />
      {orders.length === 0 ? (
        <p className="fw-bold">No orders available.</p>
      ) : (
        <>
          <Row className="gy-3">
            {displayedOrders.map((order) => (
              <Col xs={12} sm={6} md={6} lg={3}  key={order._id}>
                <div className="order-card border p-3 rounded shadow-sm bg-white h-100">
                  <p className="fw-bold mb-1">Address:</p>
                  <p>{order.address}</p>
                  <p className="fw-bold mb-1">Final Price:</p>
                  <p>${order.finalPrice}</p>
                  <p className="fw-bold mb-1">Payment Type:</p>
                  <p>{order.paymentType}</p>
                  <p className="fw-bold mb-1">Phone:</p>
                  <p>{order.phoneNumber}</p>
                  <p className="fw-bold mb-1">Status:</p>
                  <Badge bg={order.status === "pending" ? "warning" : "success"} className="mb-2">
                    {order.status}
                  </Badge>
                  <h6 className="fw-bold mt-3">Products:</h6>
                  <ul className="list-unstyled">
                    {order.products.map((product) => (
                      <li className="p-2 border-bottom" key={product._id}>
                        {product.quantity}x {product.productId?.name || "Unknown Product"} - ${product.finalPrice}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted small mt-2">
                    Created at: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {order.status === "pending" && (
                    <button className="btn btn-danger w-50 mt-3" onClick={() => handleCancelOrder(order._id)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </Col>
            ))}
          </Row>

         
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4 ">
              <Pagination.Prev 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </Container>
    </>
   
  );
}
