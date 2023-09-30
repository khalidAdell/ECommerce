import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Slices/ProductSlice";
import "./MyOrder.css";

const MyOrders = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="orders-page">
      <div className="container">
        <table className="orders-table">
          <thead>
            <tr>
              <td>Product</td>
              <td>Image</td>
              <td>Price</td>
              <td>Status</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {products.status === "success" &&
              products.data.productsData.slice(0, 10).map((item) => {
                return (
                  <tr className="item" key={item.id}>
                    <td className="item-text">
                      <h3>{item.title}</h3>
                    </td>
                    <td>
                      <div className="item-img">
                        <img src={item.images[0]} alt="item" />
                      </div>
                    </td>
                    <td className="price">${item.price}</td>
                    <td>
                      <p className="status">Pending</p>
                    </td>
                    <td>
                      <button className="removeBtn">Remove</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button className="removeAllBtn">Remove All</button>
      </div>
    </section>
  );
};

export default MyOrders;
