// import React, { useEffect, useState } from "react";
// import "./Shop.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cartProductsFun,
//   fetchProducts,
// } from "../../redux/Slices/ProductSlice";
// import { IoMdArrowDropright } from "react-icons/io";
// import { useNavigate, useSearchParams } from "react-router-dom";
// const Shop = () => {
//   let dispatch = useDispatch();
//   let navigate = useNavigate();
//   let products = useSelector((state) => state.products);
//   let categoriesArr = [];

//   let [activeCat, setActiveCat] = useState({
//     ele: "All",
//     activeEle: null,
//   });
//   let brandArr = [];
//   let [brandVal, setBrandVal] = useState("All");
//   let [productPrice, setProductPrice] = useState("");
//   let [sorted, setSorted] = useState("latest");
//   let [search, setSeacrch] = useState("");
//   let [searchParam, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     dispatch(fetchProducts());
//     searchParam.get("category") &&
//       setActiveCat({
//         ele: searchParam.get("category"),
//         activeEle: searchParam.get("categoryNum"),
//       });
//   }, [dispatch]);

//   products.status === "success" &&
//     products.data.products.map((product) => {
//       return (
//         categoriesArr.includes(product.category) === false &&
//         categoriesArr.push(product.category)
//       );
//     });

//   products.status === "success" &&
//     products.data.products.map((product) => {
//       return (
//         brandArr.includes(product.brand) === false &&
//         brandArr.push(product.brand)
//       );
//     });

//   // toggle active between category list
//   const toggleCatActive = (e, index) => {
//     setActiveCat({
//       ele: e.target.textContent,
//       activeEle: index,
//     });
//     setSearchParams({ category: e.target.textContent, categoryNum: index });
//   };

//   // filter products on category and brand and price
//   let filterProduct =
//     products.status === "success" &&
//     products.data.products.filter((product) => {
//       if (activeCat.ele !== "All") {
//         if (brandVal !== "All") {
//           return productPrice === ""
//             ? product.category === activeCat.ele && product.brand === brandVal
//             : product.price <= productPrice &&
//                 product.category === activeCat.ele &&
//                 product.brand === brandVal;
//         } else {
//           return product.category === activeCat.ele;
//         }
//       } else if (brandVal !== "All") {
//         return productPrice === ""
//           ? product.brand === brandVal
//           : product.brand === brandVal && product.price <= productPrice;
//       } else if (productPrice !== "") {
//         return product.price <= productPrice;
//       } else {
//         return product;
//       }
//     });

//   // filter on search
//   let searchFun =
//     products.status === "success" &&
//     products.data.products.filter((product) => {
//       return (
//         product.title.toLowerCase().includes(search) ||
//         product.brand.toLowerCase().includes(search)
//       );
//     });

//   // filter on sort by List
//   let sortedFilter =
//     products.status === "success" && sorted === "hightPrice"
//       ? filterProduct.sort((a, b) => {
//           return b.price - a.price;
//         })
//       : sorted === "lowPrice"
//       ? filterProduct.sort((a, b) => {
//           return a.price - b.price;
//         })
//       : filterProduct;

//   // navigate to active product page
//   const productPage = (product) => {
//     navigate(`product/${product.id}${product.title}:brand${product.brand}`);
//   };

//   // add to cart
//   let { cartProducts } = useSelector((state) => state.products);

//   let addToCart = (product) => {
//     cartProducts.includes(product) == false &&
//       dispatch(cartProductsFun(product));
//   };

//   // load more products
//   let [productNum, setProductNum] = useState(9);
//   let loadMore = () => {
//     setProductNum((prev) => {
//       return products.data.products.length >= prev + 9
//         ? prev + 9
//         : prev + (products.data.products.length - prev);
//     });
//   };
//   return (
//     // <section className="shop">
//     //   <div className="container">
//     //     <div className="side-bar">
//     //       <div className="side-list categories-list">
//     //         <h3 className="side-head">Categories</h3>
//     //         <h4
//     //           className={
//     //             activeCat.activeEle !== null
//     //               ? "catigory "
//     //               : "catigory active-cat"
//     //           }
//     //           onClick={e => {
//     //             toggleCatActive(e, null);
//     //             setSearchParams({});
//     //           }}
//     //         >
//     //           <IoMdArrowDropright />
//     //           All
//     //         </h4>
//     //         {categoriesArr.length > 0 &&
//     //           categoriesArr.map((product, index) => {
//     //             return (
//     //               <h4
//     //                 key={`category-${index}`}
//     //                 className={
//     //                   activeCat.activeEle != index
//     //                     ? "catigory "
//     //                     : "catigory active-cat"
//     //                 }
//     //                 onClick={e => {
//     //                   toggleCatActive(e, index);
//     //                 }}
//     //               >
//     //                 <IoMdArrowDropright />
//     //                 {product}
//     //               </h4>
//     //             );
//     //           })}
//     //       </div>
//     //       <div className="side-list brand-list">
//     //         <h3 className="side-head">Brand</h3>
//     //         <select
//     //           name="brand"
//     //           id="brand"
//     //           value={brandVal}
//     //           onChange={e => setBrandVal(e.target.value)}
//     //         >
//     //           <option value="All">All</option>
//     //           {brandArr.length > 0 &&
//     //             brandArr.map((product, index) => {
//     //               return (
//     //                 <option value={product} key={`brand-${index}`}>
//     //                   {product}
//     //                 </option>
//     //               );
//     //             })}
//     //         </select>
//     //       </div>
//     //       <div className="side-list side-price">
//     //         <h3 className="side-head">Price</h3>
//     //         <input
//     //           type="number"
//     //           value={productPrice}
//     //           onChange={e => setProductPrice(e.target.value)}
//     //           placeholder="Put your limits"
//     //         />
//     //       </div>
//     //     </div>

//     //     {/* Show All products  */}

//     //     <div className="all-products">
//     //       {products.status === "loading" && <h1>Loading</h1>}
//     //       <table className="table">
//     //         <thead className="--grid-15">
//     //           <tr>
//     //             <td>
//     //               <span className="productsNum">{filterProduct.length}</span>:
//     //               Products found
//     //             </td>
//     //             <td>
//     //               <input
//     //                 type="search"
//     //                 placeholder="Search"
//     //                 value={search}
//     //                 onChange={e => setSeacrch(e.target.value)}
//     //               />
//     //             </td>
//     //             <td>
//     //               <span className="selectedList">
//     //                 Sort by:{" "}
//     //                 <select
//     //                   value={sorted}
//     //                   onChange={e => setSorted(e.target.value)}
//     //                 >
//     //                   <option value="latest">Latest</option>
//     //                   <option value="lowPrice">Low price</option>
//     //                   <option value="hightPrice">Hight price</option>
//     //                 </select>
//     //               </span>
//     //             </td>
//     //           </tr>
//     //         </thead>
//     //         <tbody>
//     //           <tr className="cards-container">
//     //             {/* if search  */}
//     //             {products.status === "success" && search.trim().length > 0
//     //               ? searchFun.map(product => {
//     //                   return (
//     //                     <td key={product.title}>
//     //                       <div className="product-card">
//     //                         <div
//     //                           className="product-image"
//     //                           onClick={() => productPage(product)}
//     //                         >
//     //                           <img src={product.images[0]} alt="product" />
//     //                         </div>
//     //                         <div className="product-content">
//     //                           <p>${product.price}</p>
//     //                           <h3>{product.title}</h3>
//     //                         </div>
//     //                         <button className="product-card-btn">
//     //                           Add to cart
//     //                         </button>
//     //                       </div>
//     //                     </td>
//     //                   );
//     //                 })
//     //               : // if not search
//     //                 products.status === "success" &&
//     //                 filterProduct.splice(0, productNum).map(product => {
//     //                   return (
//     //                     <td key={product.title}>
//     //                       <div className="product-card">
//     //                         <div className="product-image">
//     //                           <img
//     //                             src={product.images[0]}
//     //                             alt="product"
//     //                             onClick={() => productPage(product)}
//     //                           />
//     //                         </div>
//     //                         <div className="product-content">
//     //                           <p>${product.price}</p>
//     //                           <h3>{product.title}</h3>
//     //                         </div>
//     //                         <button
//     //                           className="product-card-btn"
//     //                           onClick={() => {
//     //                             addToCart(product);
//     //                           }}
//     //                         >
//     //                           Add to cart
//     //                         </button>
//     //                       </div>
//     //                     </td>
//     //                   );
//     //                 })}
//     //           </tr>
//     //         </tbody>
//     //         <tfoot>
//     //           <tr>
//     //             <td>
//     //               <button
//     //                 className={
//     //                   products.status === "success" &&
//     //                   productNum < products.data.products.length
//     //                     ? "load-more-btn --btn --btn-primary"
//     //                     : "load-more-btn --btn"
//     //                 }
//     //                 onClick={loadMore}
//     //               >
//     //                 Load more
//     //               </button>
//     //             </td>
//     //           </tr>
//     //         </tfoot>
//     //       </table>
//     //     </div>
//     //   </div>
//     // </section>
//     <div>a</div>
//   );
// };

// export default Shop;
