import React from "react";
import img1 from "../../../assets/img/images_about_01.jpg";
import img2 from "../../../assets/img/images_about_02.jpg";
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";

export default function About() {
  return (
    <>
      <MainVeiw title={"About us"} subtitle={"Home/about"} />
      <div className="container">
        <h2 className="text-center m-3 mb-5">
          Furns is a global furniture destination for somethings. We sell
          cutting-edge furniture and offer a wide variety of fashion-related
          content.
        </h2>
        <div className="row gy-3">
          <div className="col-sm-12 col-lg-6">
            <img src={img1} alt="About Us" className="img-fluid h-100" />
          </div>
          <div className="col-sm-12 col-lg-6">
            <img src={img2} alt="About Us" className="img-fluid h-100" />
          </div>
        </div>
        <div className="row  mt-5">
          <div className="col-md-6">
            <p className="fw-bold mb-3">OUR STORES</p>
            <p>
              Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse. Lorem ipsum dolor sit amet
              conse ctetur adipisicing elit, sed do eiusmod tempor.
            </p>
          </div>
          <div className="col-md-6 ">
            <p className="fw-bold mb-3">OUR MISSION</p>
            <p>
              Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse. Lorem ipsum dolor sit amet
              conse ctetur adipisicing elit, sed do eiusmod tempor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
