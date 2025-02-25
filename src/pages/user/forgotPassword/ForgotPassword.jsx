import React, { useState } from "react";
import { Form, Button, FloatingLabel, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../login/login.css";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const sendCode = async (value) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BURL}/auth/sendcode`,
        { email: value.email }
      );

      if (res.status === 200) {
        toast.info("Check your email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error("Failed to send code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  const forgotPassword = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/auth/forgotPassword`,
        value
      );

      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(forgotPassword)} className="form-container vh-100">
        <div className="auth-card p-20 shadow">
          <h2 className="text-center mb-4">Forgot Password</h2>
          {serverError && <div className="text-danger mb-3">{serverError}</div>}

          <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
            className="mb-3 w-100 p-2"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </FloatingLabel>

          <Button
            variant="primary"
            className="w-50 auth-button"
            onClick={() => sendCode({ email: getValues("email") })}
          >
            Send Code
          </Button>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3 w-100 p-2"
          >
            <Form.Control
              type="password"
              placeholder="New Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingCode"
            label="Code"
            className="mb-3 w-100 p-2"
          >
            <Form.Control
              type="text"
              placeholder="Code"
              {...register("code", { required: "Code is required" })}
            />
            {errors.code && (
              <div className="text-danger">{errors.code.message}</div>
            )}
          </FloatingLabel>

          <Button
            type="submit"
            variant="primary"
            className="w-50 auth-button"
            disabled={isLoading}
          >
            {isLoading ? "...Loading" : "Submit"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
