import Home from "./Pages/Home";
import Other from "./Pages/Other";
import NotFound from "./Pages/NotFound";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/other" element={<Other />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
