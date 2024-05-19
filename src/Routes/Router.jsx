import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../components/Main/Main";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </>
  );
};

export default Router;
