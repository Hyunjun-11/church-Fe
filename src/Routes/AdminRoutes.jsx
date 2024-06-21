import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Pages/admin/AdminLayout";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import AdminUsers from "../Pages/admin/AdminUser";
import AdminPost from "../Pages/admin/AdminPost";
import AdminBanner from "../Pages/admin/AdminBanner";
import AdminSchedule from "../Pages/admin/AdminSchedule";
import AdminLogin from "../Pages/admin/Adminlogin";
import AdminPostDetail from "../Pages/admin/AdminPostDetail";
import AdminBibleRecitation from "../Pages/admin/AdminBibleRecitation";
import AdminBibleRecitationWrite from "../Pages/admin/AdminBibleRecitationWrite";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="posts" element={<AdminPost />} />
        <Route path="posts/:id" element={<AdminPostDetail />} />
        <Route path="banner" element={<AdminBanner />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route path="bibleRecitation" element={<AdminBibleRecitation />} />
        <Route
          path="bibleRecitation/write"
          element={<AdminBibleRecitationWrite />}
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
