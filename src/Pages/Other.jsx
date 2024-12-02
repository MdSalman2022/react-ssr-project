// [src/Pages/Other.jsx](src/Pages/Other.jsx)
import React from "react";
import useMeta from "../useMeta";

const Other = () => {
  useMeta({
    title: "Other Page",
    description: "This is another page.",
  });

  return (
    <div>
      <h1>Other Page</h1>
      {/* Rest of your content */}
    </div>
  );
};

export default Other;
