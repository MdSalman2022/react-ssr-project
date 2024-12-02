// [src/Pages/NotFound.jsx](src/Pages/NotFound.jsx)
import React from "react";
import useMeta from "../useMeta";

const NotFound = () => {
  useMeta({
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
  });

  return (
    <div>
      <h1>404 - Not Found</h1>
      {/* Rest of your content */}
    </div>
  );
};

export default NotFound;
