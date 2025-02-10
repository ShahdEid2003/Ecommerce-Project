import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";


export default function Categories() {
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/categories/active`
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={3.3}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data.categories.map((category) => (
          <SwiperSlide key ={category._id}>
            <img src={category.image.secure_url} alt="Category" />
            
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
