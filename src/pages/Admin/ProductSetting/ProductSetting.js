import React, { useEffect, useState } from "react";
import "./ProductSetting.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/Slices/ProductSlice";
import { AiOutlineDelete } from "react-icons/ai";
const ProductSetting = () => {
  let dispatch = useDispatch();
  let products = useSelector(state => state.products);
  let { activeProduct } = useSelector(state => state.products);
  let [productTitle, setProductTitle] = useState("");
  let [description, setProductDescription] = useState("");
  let [productPrice, setProductPrice] = useState("");
  let [productCategory, setProductCategory] = useState("");

  // get categories
  let categoriesArr = [];
  products.status === "success" &&
    products.data.products.map(product => {
      return (
        categoriesArr.includes(product.category) === false &&
        categoriesArr.push(product.category)
      );
    });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="edit-product">
      <h1>Edit Product</h1>
      <form>
        <div>
          <label>Product title</label>
          <input
            type="text"
            value={productTitle}
            onChange={e => setProductTitle(e.target.value)}
            placeholder="Product title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={e => setProductDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div>
          <label>Images</label>
          <div className="product-images">
            {activeProduct.images.map((image, i) => {
              return (
                <div key={image + i}>
                  <img src={image} alt="product" />
                  <button className="delete-img">
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <label>Category</label>
          <select
            value={productCategory}
            onChange={e => setProductCategory(e.target.value)}
            className="product-categories"
            placeholder="Category"
          >
            {categoriesArr.length > 0 &&
              categoriesArr.map((category, index) => {
                return (
                  <option value={category} key={`category-${index}`}>
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <button className="submit-btn --btn --btn-primary">Submit item</button>
      </form>
    </div>
  );
};

export default ProductSetting;
