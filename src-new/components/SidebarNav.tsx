import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const SidebarNav = () => {
  const { user, logout } = useAuth();

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard" className={activeClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={activeClass}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={activeClass}>
            Courses
          </NavLink>
        </li>
        {user?.role === "admin" && (
          <li>
            <NavLink to="/admin" className={activeClass}>
              Admin
            </NavLink>
          </li>
        )}
        <li>
          <button onClick={logout} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
