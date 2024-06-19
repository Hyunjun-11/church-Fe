import { useLocation } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import Router from "./Routes/Router";
import { useEffect } from "react";
import { fetchCurrentUser } from "./api/api";
import { useDispatch } from "react-redux";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="app">{isAdminPage ? <AdminRoutes /> : <Router />}</div>
  );
};

export default App;
