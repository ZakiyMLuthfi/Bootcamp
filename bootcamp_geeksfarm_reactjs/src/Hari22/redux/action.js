// src/Hari22/redux/action.js

// tipe-tipe dari action
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

// pembuatan action
export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};
