import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { filterCartProducts } from "../../redux/Slices/ProductSlice";

const Cart = () => {
  let { cartProducts } = useSelector((state) => state.products);
  let dispatch = useDispatch();

  let deleteItem = (product) => {
    return cartProducts.filter((item) => {
      return item.id !== product.id;
    });
  };

  let clearAllItem = () => {
    return (cartProducts = []);
  };
  return (
    <section className="cart-page">
      <div className="container">
        {cartProducts.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <td>Product</td>
                <td>Image</td>
                <td>Price</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((item) => {
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
                      <button
                        onClick={() =>
                          dispatch(filterCartProducts(deleteItem(item)))
                        }
                        className="removeBtn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <h1 className="emptyMsg">Your Cart is empty</h1>
          </div>
        )}
        <h1 className="total-price">
          Total Price:
          <span className="price">
            {" "}
            ${" "}
            {cartProducts.length > 0
              ? cartProducts.reduce((acc, cur) => acc + +cur.price, 0)
              : "0"}
          </span>
        </h1>
        <button
          className="removeAllBtn"
          onClick={() => dispatch(filterCartProducts(clearAllItem()))}
        >
          Remove All
        </button>
      </div>
    </section>
  );
};

export default Cart;
