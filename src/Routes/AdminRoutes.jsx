import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Pages/admin/AdminLayout";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import AdminUsers from "../Pages/admin/AdminUser";
import AdminPost from "../Pages/admin/AdminPost";
import AdminBanner from "../Pages/admin/AdminBanner";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="posts" element={<AdminPost />} />
        <Route path="banner" element={<AdminBanner />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
