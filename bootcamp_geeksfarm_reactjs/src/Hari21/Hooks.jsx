import React, { useState } from "react";

const ColorCheck = () => {
  const [color, setColor] = useState("red");
  const [car, setCar] = useState({
    brand: "Ford",
    model: "mustang",
    color: "red",
    year: 1964,
  });

  const updateColor = () => {
    setCar((previousState) => {
      return {
        ...previousState,
        color: previousState.color === "blue" ? "red" : "blue",
      };
    });
  };
  return (
    <div>
      <h1>
        MY favorite car is {car.brand} {car.model}! It is a {car.color} car from{" "}
        {car.year}
      </h1>
      <button type="button" onClick={updateColor}>
        Change Color
      </button>

      <h1>My Favorite color is {color}!</h1>
      <button type="button" onClick={() => setColor("blue")}>
        Blue
      </button>
      <button type="button" onClick={() => setColor("yellow")}>
        Yellow
      </button>
      <button type="button" onClick={() => setColor("red")}>
        Red
      </button>
    </div>
  );
};

export default ColorCheck;
