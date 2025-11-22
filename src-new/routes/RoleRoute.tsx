import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  role: "admin" | "user";
}

const RoleRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (userRole !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

export default RoleRoute;
