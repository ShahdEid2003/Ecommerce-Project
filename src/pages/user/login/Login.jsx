import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
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
        `https://ecommerce-node4.onrender.com/auth/signin`,
        value
      );
      if (response.status == 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit(registerUser)} className="form-container">
      <div className="card">
        <h2>Login</h2>
        {serverError ? <div className="text-danger">{serverError}</div> : null}
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
          {isLoading ? "...Loading" : "Login"}
        </Button>
      </div>
    </Form>
  );
}
