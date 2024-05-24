import { useLocation } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import Router from "./Routes/Router";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return <>{isAdminPage ? <AdminRoutes /> : <Router />}</>;
};

export default App;
