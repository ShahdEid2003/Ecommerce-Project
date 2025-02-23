import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import Category from "../../../components/user/category/Category";
import AllProducts from "../../../components/user/products/AllProducts";
import { motion } from "framer-motion";
import "./Home.css";
export default function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Welcome to Our Store", "Discover Our Exclusive Products!"],
      typeSpeed: 100,
      backSpeed: 50,
      startDelay: 100,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div class="homeImg">
        <div class="content vh-100 text-center  d-flex justify-content-center align-items-center">
          <div class="title">
            <h1 ref={typedRef}></h1>
            <button className=" btn btnShop ">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className=" m-5">
          <motion.div
            className="m-5"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Category />
          </motion.div>
        </div>
        <div className="  m-5">
          <motion.div
            className="m-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AllProducts />
          </motion.div>
        </div>
      </div>
    </>
  );
}
