import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>;
      </Routes>
    </>
  );
};

export default Router;
