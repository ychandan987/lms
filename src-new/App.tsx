import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RoleRoute from "./routes/RoleRoute";

import Layout from "./components/AdminDashboard/Layout";
import Login from "./components/AdminDashboard/Login";

import DashBoard from "./Pages/DashBoard";
import UsersPage from "./Pages/UsersPage";
import CoursesPage from "./Pages/CoursesPage";
import AdminPage from "./Pages/AdminPage";

import { AuthProvider, useAuth } from "./context/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";

const AppRoutes = () => {
  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashBoard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <CoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <Layout>
              <AdminPage />
            </Layout>
          </RoleRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
