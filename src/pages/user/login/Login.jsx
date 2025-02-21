import React from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <Form onSubmit={handleSubmit(registerUser)} className="form-container">
        <div className="auth-card d-flex justify-content-center align-items-center gap-2 flex-column shadow">
          <h2 className="text-center mb-4 fw-bold">Login</h2>
          {serverError && <div className="text-danger mb-3">{serverError}</div>}

          <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
            className="mb-3 w-100 p-2 floatingLabel"
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

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3 w-100 p-2 floatingLabel"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </FloatingLabel>

          <div className="row gap-5 w-100 d-flex flex-column align-items-center">
            <Button
              type="submit"
              className="w-50 auth-button"
              disabled={isLoading}
            >
              {isLoading ? "...Loading" : "SIGN IN"}
            </Button>

            <div className="row d-flex justify-content-center align-items-center w-100">
              <div className="col-6 text-center">
                <Link to="/auth/register" className="text-decoration-none">
                  <div className="btnRegister text-decoration-none p-2">
                    SIGN UP
                  </div>
                </Link>
              </div>
              <div className="col-6 text-center">
                <Link to="/auth/forgot" className="text-decoration-none">
                  <div className="btnPassword  p-2">Forgot Password?</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
