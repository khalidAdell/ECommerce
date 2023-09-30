import React, { useEffect } from "react";
import "./Gallary.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartProductsFun,
  fetchProducts,
} from "../../redux/Slices/ProductSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Gallary = ({ title }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1340 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1340, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // navigate to active product page
  const productPage = (product) => {
    navigate(`shop/${product.id}`);
  };

  // add to cart
  let { cartProducts } = useSelector((state) => state.products);
  let { isLoggedIn } = useSelector((state) => state.auth);

  // add to cart
  let addToCart = (product) => {
    if (isLoggedIn) {
      cartProducts.includes(product) === false &&
        dispatch(cartProductsFun(product));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="gallary">
      <h2>{title}</h2>
      <Carousel responsive={responsive}>
        {products.status === "success" &&
          products.data.productsData.map((product) => {
            return (
              <div key={product.id}>
                <div className="product-card">
                  <img
                    className="product-image"
                    src={product.images[0]}
                    alt="product"
                    onClick={() => productPage(product)}
                  />
                  <div className="product-content">
                    <h3>{product.title}</h3>
                    <div className="product-rating">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <p> {product.rating.rate}</p>
                    </div>
                    <p>${product.price}</p>
                  </div>
                  <button
                    className="product-card-btn"
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </Carousel>
      ;
    </div>
  );
};

export default Gallary;
