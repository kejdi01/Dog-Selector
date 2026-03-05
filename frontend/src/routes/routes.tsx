import { Routes, Route } from "react-router-dom";

import DogsPage from "../pages/DogsPage";
import ContactPage from "../pages/ContactPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DogsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRouter;
