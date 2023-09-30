import React, { useEffect, useState } from "react";
import "./SideFilter.css";
import { fetchProducts } from "../../redux/Slices/ProductSlice";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SideFilter = ({
  setFilteredProducts,
  sort,
  search,
  showSide,
  setShowSide,
  setCurrentPage,
}) => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let [searchParam, setSearchParams] = useSearchParams();

  let [categoriesArr, setCategoriesArr] = useState([]);
  let [activeCat, setActiveCat] = useState({
    ele: "All",
    activeEle: null,
  });

  let [brandArr, setBrandArr] = useState([]);
  let [brandVal, setBrandVal] = useState("All");
  let [productPrice, setProductPrice] = useState("");

  // toggle active between category list
  const toggleCatActive = (e, index) => {
    setActiveCat({
      ele: e.target.textContent,
      activeEle: index,
    });
    setSearchParams({ category: e.target.textContent, categoryNum: index });
    setCurrentPage(1);
  };

  // fetch data and set params
  useEffect(() => {
    dispatch(fetchProducts());
    searchParam.get("category") &&
      setActiveCat({
        ele: searchParam.get("category"),
        activeEle: searchParam.get("categoryNum"),
      });
  }, [dispatch, searchParam]);

  // get categories and brands
  useEffect(() => {
    products.status === "success" &&
      products.data.productsData.map((product) => {
        return setCategoriesArr((prev) =>
          Array.from(new Set([...prev, product.category]))
        );
      });

    products.status === "success" &&
      products.data.productsData.map((product) => {
        return setBrandArr((prev) =>
          Array.from(new Set([...prev, product.brand]))
        );
      });
  }, [products]);

  // filter products on category and brand and price
  let filterProduct = () =>
    products.status === "success" &&
    products.data.productsData.filter((product) => {
      if (activeCat.ele !== "All") {
        if (brandVal !== "All") {
          return productPrice === ""
            ? product.category === activeCat.ele && product.brand === brandVal
            : product.price <= productPrice &&
                product.category === activeCat.ele &&
                product.brand === brandVal;
        } else {
          return productPrice === ""
            ? product.category === activeCat.ele
            : +product.price <= +productPrice &&
                product.category === activeCat.ele;
        }
      } else if (brandVal !== "All") {
        return productPrice === ""
          ? product.brand === brandVal
          : product.brand === brandVal && product.price <= productPrice;
      } else if (productPrice !== "") {
        return +product.price <= +productPrice;
      } else {
        return product;
      }
    });

  // filter on  sort
  const handleSort = () => {
    let sortArr = products.status === "success" && filterProduct();
    if (sort === "hightPrice") {
      sortArr.sort((a, b) => b.price - a.price);
    } else if (sort === "lowPrice") {
      sortArr.sort((a, b) => a.price - b.price);
    }
    products.status === "success" && setFilteredProducts(sortArr);
  };
  // filter on search
  let searchFilter = () => {
    let searchArr = products.status === "success" && filterProduct();
    products.status === "success" &&
      setFilteredProducts(
        searchArr.filter((product) => {
          return (
            product.title.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search)
          );
        })
      );
  };

  useEffect(() => {
    search.trim() !== "" ? searchFilter() : handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandVal, activeCat, products, productPrice, sort, search]);
  return (
    <div className={`side-bar ${showSide && "showSide"}`}>
      <div className="side-list categories-list">
        <h3 className="side-head">
          Categories{" "}
          <AiOutlineCloseCircle
            style={{ cursor: "pointer" }}
            className="closeSide"
            onClick={() => setShowSide(false)}
          />
        </h3>
        <h4
          className={
            activeCat.activeEle !== null ? "category " : "category active-cat"
          }
          onClick={(e) => {
            toggleCatActive(e, null);
            setSearchParams({});
          }}
        >
          <IoMdArrowDropright />
          All
        </h4>
        {categoriesArr.length > 0 &&
          categoriesArr.map((product, index) => {
            return (
              <h4
                key={`category-${index}`}
                className={
                  activeCat.activeEle !== index
                    ? "category "
                    : "category active-cat"
                }
                onClick={(e) => {
                  toggleCatActive(e, index);
                }}
              >
                <IoMdArrowDropright />
                {product}
              </h4>
            );
          })}
      </div>
      <div className="side-list brand-list">
        <h3 className="side-head">Brand</h3>
        <select
          name="brand"
          id="brand"
          value={brandVal}
          onChange={(e) => setBrandVal(e.target.value)}
        >
          <option value="All">All</option>
          {brandArr.length > 0 &&
            brandArr.map((product, index) => {
              return (
                <option value={product} key={`brand-${index}`}>
                  {product}
                </option>
              );
            })}
        </select>
      </div>
      <div className="side-list side-price">
        <h3 className="side-head">Price</h3>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Put your limits"
        />
      </div>
    </div>
  );
};

export default SideFilter;
