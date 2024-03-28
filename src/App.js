import React, { useReducer } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { Products } from "./constant";

const initialState = {
  products: [...Products],
  carts: [],
};

const reducer = (state, action) => {
  console.log("HI");
  switch (action.type) {
    // to increase the product count
    case "ADDPRODUCT":
      return {
        ...state,
        // loop through the products, to find the  dispatched product index  and update the product
        products: state.products.map((product, index) =>
          index === action.index
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };

    case "REMOVEPRODUCT":
      //to remove the product count
      return {
        ...state,
        // loop through the products, to find the  dispatched product index  and update the product
        products: state.products.map((product, index) =>
          index === action.index
            ? { ...product, quantity: Math.max(0, product.quantity - 1) }
            : product
        ),
      };
    // to add the cartItems
    case "ADDCART":
      // select the clicked item from the product
      const selectedItem = state.products[action.index];
      // check the selected element is existed in the cart, if existed then take its index
      const existedItemIndex = state.carts.findIndex(
        (item) => item.name === selectedItem.name
      );

      // if existed then update its count
      if (existedItemIndex !== -1) {
        const updatedCarts = state.carts.map((item, index) =>
          index === existedItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          carts: updatedCarts, //updating carts
        };
      } else {
        //if item is not existed in the cart
        return {
          ...state,
          carts: [...state.carts, { ...selectedItem, quantity: 1 }],
        };
      }

    case "REMOVECART":
      const cartItemIndex = state.carts.findIndex(
        (item) => item.name === state.products[action.index].name
      );
      if (cartItemIndex !== -1) {
        const updatedCarts = state.carts.map((item, index) =>
          index === cartItemIndex && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        return {
          ...state,
          carts: updatedCarts.filter((item) => item.quantity > 0),
        };
      } else {
        return state;
      }
    default: {
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Product products={Products} dispatch={dispatch} state={state} />
      <Cart state={state} />
    </div>
  );
}

export default App;
