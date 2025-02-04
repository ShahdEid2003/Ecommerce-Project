import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import "./register.css";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerUser = async (value) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/auth/signup`,
        value
      );
      if (response.status == 201) {
        toast.info("Please check your email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setServerError("email already in use");
      } else {
        setServerError("server error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit(registerUser)} className="form-container">
      {serverError ?? <div className="text-danger">{serverError}</div>}
      <div className="card">
        <h2>Sign up</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="userName"
          className="item mb-3"
        >
          <Form.Control
            type="text"
            placeholder="UserName"
            {...register("userName", { required: "userName is required" })}
          />
          {errors.userName ? (
            <div className="text-danger">{errors.userName.message}</div>
          ) : null}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Email Address"
          className="item mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...register("email", { required: "email is required" })}
          />
          {errors.email ? (
            <div className="text-danger">{errors.email.message}</div>
          ) : null}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="item"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: "password is required" })}
          />
          {errors.password ? (
            <div className="text-danger">{errors.password.message}</div>
          ) : null}
        </FloatingLabel>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "...Loading" : "Register"}
        </Button>
      </div>
    </Form>
  );
}
