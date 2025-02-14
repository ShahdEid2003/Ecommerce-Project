import React from "react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/loader";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/user/context/CartContext";

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
        `https://ecommerce-node4.onrender.com/order`,
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
        `https://ecommerce-node4.onrender.com/cart`,
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
      {serverError && <div className="text-danger">{serverError}</div>}
      <div className="d-flex gap-3 mb-3">
        {cart.map((item) => (
          <div key={item._id}>
            <img
              src={item.details.mainImage.secure_url}
              alt="Product"
              width="50px"
            />
          </div>
        ))}
      </div>

      <Form
        onSubmit={handleSubmit(handleSubmitOrder)}
        className="form-container"
      >
        {serverError && <div className="text-danger">{serverError}</div>}
        <div className="card p-4">
          <h2 className="text-center">Create Order</h2>

          <FloatingLabel
            controlId="floatingCoupon"
            label="Coupon Name"
            className="mb-3"
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
            className="mb-3"
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
            className="mb-3"
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
            variant="warning"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Order to Install"}
          </Button>
        </div>
      </Form>
    </>
  );
}
