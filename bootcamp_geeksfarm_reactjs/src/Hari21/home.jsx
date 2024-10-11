import React from "react";
import ColorCheck from "./Hooks.jsx";
import Counter from "../Hari22/components/counter.jsx";

const Home = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <p>Welcome!</p>
      <ColorCheck />
      <div>
        <Counter />
      </div>
    </div>
  );
};

export default Home;
