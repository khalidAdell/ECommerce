import React, { useState } from "react";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import { cartProductsFun } from "../../redux/Slices/ProductSlice";
import { AiFillStar } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SideFilter from "../../components/SideFilter/SideFilter";

const Shop = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let products = useSelector((state) => state.products);
  let [sorted, setSorted] = useState("latest");
  let [search, setSeacrch] = useState("");
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [showSide, setShowSide] = useState(false);

  let { isLoggedIn } = useSelector((state) => state.auth);
  // navigate to active product page
  const productPage = (product) => {
    navigate(`${product.id}`);
  };

  // add to cart
  let { cartProducts } = useSelector((state) => state.products);

  let addToCart = (product) => {
    if (isLoggedIn) {
      cartProducts.includes(product) === false &&
        dispatch(cartProductsFun(product));
    } else {
      navigate("/login");
    }
  };

  // pagination
  let [currentPage, setCurrentPage] = useState(1);
  let productsPerPage = 12;
  let lastndex = productsPerPage * currentPage;
  let firstIndex = lastndex - productsPerPage;
  let paginationData = filteredProducts;
  let pagesNum = [
    ...Array(Math.ceil(filteredProducts.length / productsPerPage) + 1).keys(),
  ].slice(1);

  return (
    <section className="shop">
      <div className="container">
        {/* Show All products  */}

        <div className="products-container">
          <SideFilter
            setFilteredProducts={setFilteredProducts}
            sort={sorted}
            search={search}
            showSide={showSide}
            setShowSide={setShowSide}
            setCurrentPage={setCurrentPage}
          />

          <table className="table">
            <thead className="--grid-15">
              <tr>
                <td>
                  <BsSliders
                    onClick={() => setShowSide((prev) => !prev)}
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <span className="productsNum">{filteredProducts.length}</span>
                  : Products found
                </td>
                <td>
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSeacrch(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <span className="selectedList">
                    Sort by:{" "}
                    <select
                      value={sorted}
                      onChange={(e) => setSorted(e.target.value)}
                    >
                      <option value="latest">Latest</option>
                      <option value="lowPrice">Low price</option>
                      <option value="hightPrice">Hight price</option>
                    </select>
                  </span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="cards-container">
                {products.status === "success" &&
                  paginationData.slice(firstIndex, lastndex).map((product) => {
                    return (
                      <td key={product.id}>
                        <div className="product-card">
                          <img
                            className="product-image"
                            src={product.images[0]}
                            alt="product"
                            onClick={() => productPage(product)}
                          />
                          <div className="product-content">
                            <h3>{product.title.slice(0, 30)}...</h3>
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
                      </td>
                    );
                  })}
              </tr>
            </tbody>
          </table>
          <ul className="pagination-list">
            {pagesNum.map((num, i) => (
              <li
                className={`${num === currentPage ? "active-page" : ""}`}
                key={i}
                onClick={() => {
                  setCurrentPage(num);
                  window.scrollTo(0, 0);
                }}
              >
                {num}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Shop;
