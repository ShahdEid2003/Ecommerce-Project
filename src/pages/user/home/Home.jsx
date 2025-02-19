import React from "react";
import Category from "../../../components/user/category/Category";
import AllProducts from "../../../components/user/products/AllProducts"
import "./Home.css";
export default function Home() {
  return (
    <>
      <div class="homeImg">
        <div class="content vh-100 text-center  d-flex justify-content-center align-items-center">
            <div class="title">
              <h1>Welcome to Our Store</h1>
              <p className='fw-bold'>Discover Our Exclusive Products!</p>
              <button className=" btn btnShop " >Shop Now</button>
              </div>
           
            
        </div>
    </div>
      <div className="mt-2">
      <div className=" m-5">
        <h4 className=" fw-bold mb-3">Categories</h4>
        <Category />
        </div>
        <div className="  m-5">
        <AllProducts />
        </div>
      </div>
      
    </>
  );
}
