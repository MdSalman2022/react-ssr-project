// [src/Pages/Home.jsx](src/Pages/Home.jsx)
import React from "react";
import useMeta from "../useMeta";
import CSRSection from "./CSRSection";

const Home = () => {
  useMeta({
    title: "Home Page",
    description: "Welcome to the Home Page.",
  });

  return (
    <div>
      <h1>Home Page</h1>
      {/* Rest of your content */}
      <CSRSection />
    </div>
  );
};

export default Home;
