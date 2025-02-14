import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import DashLayout from "./layouts/DasboardLayout.jsx";
import Login from "./pages/user/login/Login.jsx";
import Register from "./pages/user/register/Register.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import { ToastContainer } from "react-toastify";
import Categories from "./pages/user/categories/Categories.jsx";
import Home from "./pages/user/home/Home.jsx";
import Products from "./pages/user/products/Products.jsx";
import CategoryProducts from "./pages/user/products/CategoryProduct.jsx";
import ProductDetails from "./pages/user/products/ProductDetails.jsx";
import Cart from "./pages/user/cart/Cart.jsx";
import ProtectedRoute from "./components/ProtectesRoute.jsx";
import CartContextProvider from "./components/user/context/CartContext.jsx";
import Profile from "./pages/user/profile/Profile.jsx";
import Orders from "./pages/user/profile/Orders.jsx";
import Info from "./pages/user/profile/Info.jsx";
import UserContextProvider from "./components/user/context/UserContext.jsx";
import AuthProtectedRoute from "./components/AuthProtectedRoute.jsx"
import Image from "./pages/user/profile/Image.jsx";
import ForgotPassword from "./pages/user/forgotPassword/ForgotPassword.jsx";
import CreateOrder from "./pages/user/createOrder/CreateOrder.jsx";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <AuthProtectedRoute>
          <AuthLayout />
        </AuthProtectedRoute>
      ),
      children: [
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgot", element: <ForgotPassword /> },
       
      ],
    },
    {
      path: "/",

      element: (
        <CartContextProvider>
          <UserContextProvider>
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          </UserContextProvider>
        </CartContextProvider>
      ),

      children: [
        { path: "/", element: <Home /> },
        { path: "product", element: <Products /> },
        { path: "category", element: <Categories /> },
        { path: "categories/:categoryId", element: <CategoryProducts /> },
        { path: "product/:productId", element: <ProductDetails /> },
        { path: "cart", element: <Cart /> },
        { path: "create-order", element: <CreateOrder /> },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "order", element: <Orders /> },
            { path: "info", element: <Info /> },
            { path: "image", element: <Image /> },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashLayout />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
