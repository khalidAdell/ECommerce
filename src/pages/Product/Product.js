import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import {
  cartProductsFun,
  fetchProducts,
} from "../../redux/Slices/ProductSlice";

const Product = () => {
  let { productId } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { cartProducts } = useSelector((state) => state.products);
  let { isLoggedIn } = useSelector((state) => state.auth);
  let products = useSelector((state) => state.products);
  const [product, setProduct] = useState("");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    products.status === "success" &&
      setProduct(
        products.data.productsData.filter(
          (product) => product.id === +productId
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.status]);

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
    <section className="singleProduct">
      {product !== "" && (
        <div className="container">
          <h1>Product Details</h1>
          <Link to={-1}>
            <BsArrowLeft style={{ verticalAlign: "middle" }} /> Back to shop
          </Link>
          <div className="single-product-card" key={product[0].title}>
            <img
              src={product[0].images[0]}
              alt="product"
              className="single-product-image"
            />
            <div className="single-product-content">
              <h2>{product[0].title}</h2>
              <p className="price">${product[0].price}</p>
              <p className="description">{product[0].description}</p>
              <p>
                <span>Brand: </span>
                {`${product[0].brand}`}
              </p>
              <p>
                <span>Rating: </span>
                {`${product[0].rating.rate}`}
                <AiFillStar
                  size={20}
                  style={{ verticalAlign: "top", color: "gold" }}
                />
              </p>
              <button
                className="single-product-card-btn"
                onClick={() => {
                  addToCart(product[0]);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Product;
