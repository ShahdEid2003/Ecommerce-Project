import React from "react";
import Category from "../../../components/user/category/Category";
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
      <div className="container-fluid">
      <div className=" p-5 m-3">
        <Category />
        </div>
      </div>
      
    </>
  );
}
