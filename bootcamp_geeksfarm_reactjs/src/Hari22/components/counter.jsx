// src/Hari22/components/counter.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../redux/action";

const Counter = () => {
  // Mengambil state 'count' dari store redux
  const count = useSelector((state) => state.count);

  const dispatch = useDispatch();
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        borderRadius: "5px",
        width: "fit-content",
        margin: "10px auto",
      }}
    >
      <h1>Counter: {count}</h1>
      <button onClickCapture={() => dispatch(increment())}>Increment</button>
      <button onClickCapture={() => dispatch(decrement())}>Decrement</button>
      <button onClickCapture={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
