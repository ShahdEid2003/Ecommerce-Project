import React from "react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, FloatingLabel, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/loader";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/user/context/CartContext";
import "../login/login.css";
import'./createOrder.css'

import axios from "axios";
export default function CreateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { setCartCount } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmitOrder = async (value) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/order`,
        value,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      setCart([]);
      setCartCount(0);
      toast.success("Order created successfully.");
      navigate("/profile/order");
    } catch (error) {
      toast.error("Failed to create order. Please try again later.");
      setServerError("Failed to create order. Please try again later.");
    } finally {
      setIsLoading(false);
      setServerError(null);
    }
  };
  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/cart`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );
      setCart(data.products);
    } catch (err) {
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

  return (
    <>
      <Container>
        {serverError && <div className="text-danger">{serverError}</div>}
        <div className="d-flex flex-wrap gap-4 mb-3 justify-content-center align-items-center">
          {cart.map((item) => (
            <div key={item._id} className="img-cart mt-5 fw-bold">
              <img
                src={item.details.mainImage.secure_url}
                alt="Product"
                width="100px"
                className="img-fluid"
              />
              <p>{item.details.finalPrice}</p>
            </div>
          ))}
        </div>

        <Form
          onSubmit={handleSubmit(handleSubmitOrder)}
          className="form-container "
        >
          <div className="auth-card d-flex justify-content-center align-items-center gap-2 flex-column shadow">        
            <h2 className="text-center fw-bold">Create Order</h2>
            <FloatingLabel
              controlId="floatingCoupon"
              label="Coupon Name"
              className="mb-3 w-100"
            >
              <Form.Control
                type="text"
                placeholder="Coupon Name"
                {...register("couponName")}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingAddress"
              label="Address"
              className="mb-3 w-100"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <div className="text-danger">{errors.address.message}</div>
              )}
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPhone"
              label="Phone"
              className="mb-3 w-100"
            >
              <Form.Control
                type="text"
                placeholder="Phone"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone.message}</div>
              )}
            </FloatingLabel>

            <Button
              type="submit"
              className="w-100 auth-button"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Order to Install"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
