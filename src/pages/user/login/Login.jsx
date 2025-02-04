import React from "react";
import { Form, Button, FloatingLabel, Container, Card } from 'react-bootstrap';
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
<Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit(registerUser)} className="form-container">
        <Card className="p-20 shadow">
          <h2 className="text-center mb-4">Login</h2>
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
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3 w-100  p-2"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </FloatingLabel>

          <Button type="submit" variant="primary" className="w-50" disabled={isLoading}>
            {isLoading ? '...Loading' : 'Login'}
          </Button>
        </Card>
      </Form>
    </Container>
  );
}
