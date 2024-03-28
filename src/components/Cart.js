import React from "react";
import "./Product.css";

const Cart = ({ state }) => {
  if (state.carts.length === 0) return;
  return (
    <div className="container">
      <h2 className="heading">Carts</h2>
      {state.carts.map((cart, index) => {
        return (
          <div className="label" key={index}>
            <span>{cart.name}</span>
            <div className="quantity">
              <span>{cart.price}</span>
              <span>x</span>
              <span>{cart.quantity}</span>
            </div>
          </div>
        );
      })}
      <p className="price">
        ₹
        {state.carts.reduce((sum, item) => sum + item.quantity * item.price, 0)}
      </p>
    </div>
  );
};

export default Cart;
