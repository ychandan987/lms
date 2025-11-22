// App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Layout & Sidebar
import Layout from "./components/AdminDashboard/Layout";

// LMS Pages
import { DashboardStats } from "./components/AdminDashboard/DashboardStats";
import { CourseGrid } from "./components/AdminDashboard/CourseGrid";
import { RecentActivity } from "./components/AdminDashboard/RecentActivity";
import UserPage from "./components/AdminDashboard/UserPage";
import { Skills } from "./components/AdminDashboard/Skills";

import QuickActions from "./components/AdminDashboard/QuickActions";
import CustomReport from "./components/AdminDashboard/CustomReport";
import ReportChart from "./components/AdminDashboard/ReportChart";
import { CalendarDays } from "./components/AdminDashboard/CalendarDays";
import { Help } from "./components/AdminDashboard/Help";
import { Messages } from "./components/AdminDashboard/Messages";
import Notification from "./components/AdminDashboard/Notification";
import Reports from "./components/AdminDashboard/Reports";
import UserReport from "./components/AdminDashboard/UserReport";
import CourseReport from "./components/AdminDashboard/CourseReport";
import ReportsLandingPage from "./components/AdminDashboard/ReportsLandingPage";
import Settings from "./components/AdminDashboard/Settings";
import Workflow from "./components/AdminDashboard/Workflow";
import UserDetailsPage from "./components/AdminDashboard/UserDetailsPage";
import CourseDetailsPage from "./components/AdminDashboard/CourseDetailsPage";
import GroupsMainPage from "./components/AdminDashboard/GroupsMainPage";
import GroupsPage from "./components/AdminDashboard/GroupsPage";
import AddGroupForm from "./components/AdminDashboard/AddGroupForm";
import CourseBuilder from "./components/AdminDashboard/CourseBuilder";
import AddUser from "./components/AdminDashboard/AddUser";
import UnitOptions from "./components/AdminDashboard/UnitOptions";
import Login from "./components/AdminDashboard/Login";
import Timeout from "./components/AdminDashboard/Timeout";
import VideoPlayer from "./components/AdminDashboard/VideoPlayer";
import AppContent from "./components/AdminDashboard/AppContent";

// --- AddUserType Modal Component ---
interface Permission {
  key: string;
  label: string;
  hasChildren?: boolean;
  children?: Permission[];
}

interface AddUserTypeProps {
  onClose: () => void;
  onSave: (data: { name: string; permissions: string[] }) => void;
}

function AddUserType({ onClose, onSave }: AddUserTypeProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [userTypeName, setUserTypeName] = useState("");

  const entities = [
    "administrator",
    "instructor",
    "learner",
    "users",
    "courses",
    "groups",
    "reports",
  ];
  const permissions: Permission[] = entities.map((entity) => ({
    key: entity,
    label: entity.charAt(0).toUpperCase() + entity.slice(1),
    hasChildren: true,
    children: ["create", "read", "update", "delete"].map((action) => ({
      key: `${entity}_${action}`,
      label: action.charAt(0).toUpperCase() + action.slice(1),
    })),
  }));

  const toggleExpanded = (item: string) =>
    setExpandedItems((prev) => ({ ...prev, [item]: !prev[item] }));

  const toggleChecked = (key: string, children?: Permission[]) => {
    const isChecked = !checkedItems[key];
    setCheckedItems((prev) => {
      const updated = { ...prev, [key]: isChecked };
      if (children) children.forEach((child) => (updated[child.key] = isChecked));
      return updated;
    });
    if (isChecked && children) setExpandedItems((prev) => ({ ...prev, [key]: true }));
  };

  const handleChildChange = (
    parentKey: string,
    childKey: string,
    siblings: Permission[]
  ) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [childKey]: !prev[childKey] };
      const allChecked = siblings.every((s) => updated[s.key]);
      updated[parentKey] = allChecked;
      return updated;
    });
    setExpandedItems((prev) => ({ ...prev, [parentKey]: true }));
  };

  const handleSave = () => {
    if (!userTypeName.trim()) {
      toast.error("Please enter a user type name");
      return;
    }
    const selectedPermissions = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    onSave({ name: userTypeName, permissions: selectedPermissions });
    toast.success("User type created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="px-6 py-6 space-y-6">
          <h1 className="text-xl font-semibold text-gray-900">Add user type</h1>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userTypeName}
              onChange={(e) => setUserTypeName(e.target.value)}
              placeholder="Enter user type name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="defaultRole"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              User type default role
            </label>
            <div className="relative">
              <select
                id="defaultRole"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
              >
                <option value="administrator">Administrator</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            {permissions.map((permission) => (
              <div key={permission.key}>
                <div className="flex items-center space-x-2 py-1">
                  {permission.hasChildren && (
                    <button
                      onClick={() => toggleExpanded(permission.key)}
                      className="flex items-center justify-center w-4 h-4 hover:bg-gray-100 rounded"
                    >
                      {expandedItems[permission.key] ? (
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                      )}
                    </button>
                  )}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedItems[permission.key] || false}
                      onChange={() =>
                        toggleChecked(permission.key, permission.children)
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      ref={(el) => {
                        if (el && permission.children) {
                          const allChildrenChecked = permission.children.every(
                            (c) => checkedItems[c.key]
                          );
                          const someChildrenChecked = permission.children.some(
                            (c) => checkedItems[c.key]
                          );
                          el.indeterminate = !allChildrenChecked && someChildrenChecked;
                        }
                      }}
                    />
                    <span className="text-sm text-gray-900">{permission.label}</span>
                  </label>
                </div>

                {permission.hasChildren && expandedItems[permission.key] && (
                  <div className="ml-10 space-y-1">
                    {permission.children?.map((child) => (
                      <label
                        key={child.key}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                        <input
                          type="checkbox"
                          checked={checkedItems[child.key] || false}
                          onChange={() =>
                            handleChildChange(permission.key, child.key, permission.children!)
                          }
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{child.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      {authenticated ? <AppContent /> : <Login />}
    </Router>
  );
}
