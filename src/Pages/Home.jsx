// [src/Pages/Home.jsx](src/Pages/Home.jsx)
import React from "react";
import useMeta from "../useMeta";

const Home = () => {
  useMeta({
    title: "Home Page",
    description: "Welcome to the Home Page.",
  });

  return (
    <div>
      <h1>Home Page</h1>
      {/* Rest of your content */}
    </div>
  );
};

export default Home;
