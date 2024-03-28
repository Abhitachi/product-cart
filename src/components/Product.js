import React from "react";
import "./Product.css";

const Product = ({ products, dispatch, state }) => {
  console.log(state);
  return (
    <div className="container">
      <h2 className="heading">Products</h2>
      {state.products.map((product, index) => {
        return (
          <div className="label" key={index}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <div className="quantity">
              <span
                className="btn"
                onClick={() => {
                  dispatch({ type: "REMOVEPRODUCT", index: index });
                  dispatch({ type: "REMOVECART", index: index });
                }}
              >
                -
              </span>
              <span>{product.quantity}</span>
              <span
                className="btn"
                onClick={() => {
                  dispatch({ type: "ADDPRODUCT", index: index });
                  dispatch({ type: "ADDCART", index: index });
                }}
              >
                +
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
