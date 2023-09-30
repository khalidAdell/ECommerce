import React, { useEffect, useState } from "react";
import { sliderData } from "../../Data/SliderDate";
import "./Slider.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
export const Slider = () => {
  let [curSlide, setCurSlide] = useState(0);

  let prevSlide = () => {
    return curSlide > 0
      ? setCurSlide((prev) => prev - 1)
      : setCurSlide(sliderData.length - 1);
  };
  let nextSlide = () => {
    return curSlide < sliderData.length - 1
      ? setCurSlide((prev) => prev + 1)
      : setCurSlide(0);
  };

  let slideInterval;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [curSlide, slideInterval]);

  return (
    <div className="slider">
      <BsFillArrowLeftCircleFill
        className="slideArrow prev"
        onClick={prevSlide}
      />
      <BsFillArrowRightCircleFill
        className="slideArrow next"
        onClick={nextSlide}
      />
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === curSlide ? "slide curSlide" : "slide"}
          >
            {index === curSlide ? (
              <>
                <img src={slide.image} alt="slideImage" />
                <div className="sliderContent">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <Link to="/shop" className="--btn --btn-primary">
                    Shop Now
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
