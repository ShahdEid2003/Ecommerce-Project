import React from "react";
import UseFetch from "../../../assets/hooks/useFetch";
import Loader from "../../../components/loader/loader";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Categories() {
  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/categories/active`
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3 className=" fw-bold mb-3   text-center">Categories</h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3.3}
        navigation={{ enabled: true }} 
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.5, navigation: false },
          480: { slidesPerView: 2.5, navigation: false },
          768: { slidesPerView: 3.2, navigation: true }, 
          1024: { slidesPerView: 3.8, navigation: true },
        }}
      >
        {data.categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Link to={`/categories/${category._id}`}>
              <img
                src={category.image.secure_url}
                alt={category.name}
                className="img-fluid rounded shadow-sm"
                style={{ width: "80%", height: "80%" }} 
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

