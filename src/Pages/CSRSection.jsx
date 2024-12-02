import React, { useState } from "react";

const CSRSection = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      CSRSection
      <button onClick={() => setCount(count - 1)}>Dec</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default CSRSection;
