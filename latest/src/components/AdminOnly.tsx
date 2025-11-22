import React from "react";
import { useAuth } from "../context/AuthProvider";

const AdminOnly = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user?.role !== "admin") return null;
  return <>{children}</>;
};

export default AdminOnly;
