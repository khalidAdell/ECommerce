import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <p>Mid Season's Sale</p>
      <h2>{title}</h2>
      <Link to={"/shop"}>Shop Now</Link>
    </div>
  );
};

export default Banner;
