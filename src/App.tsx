import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { Route, Routes } from "react-router-dom";

import Catalog from "./pages/Catalog"; // Ensure you have these components
import Detail from "./pages/detail/Detail";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category/search/:keyword" element={<Detail />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
