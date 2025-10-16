import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Map,
  Settings,
  LogOut,
  Bell,
  FileText,
  Home,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ isAdmin = false }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = isAdmin
    ? [
        { icon: Home, label: "Dashboard", path: `/admin/d/${userId}` },
        { icon: AlertTriangle, label: "Incident Reports", path: "/admin/incidents" },
        { icon: User, label: "User Management", path: "/admin/usermanagement" },
        { icon: Bell, label: "Analytics", path: "/admin/analytics" },
        { icon: Map, label: "Incidents Map", path: "/map/admin" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
      ]
    : [
        { icon: Home, label: "Home", path: `/user/${userId}` },
        { icon: AlertTriangle, label: "Report an Incident", path: "/report" },
        { icon: Map, label: "Incidents Map", path: "/map/user" },
        { icon: Bell, label: "News & Updates", path: "/news" },
        { icon: FileText, label: "Incident Details", path: "/incidents" },
        { icon: Settings, label: "App Settings", path: "/settings" },
      ];

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-7 h-7 text-yellow-400" />
          <h1 className="text-lg font-bold">RescueApp!</h1>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-300 hover:text-yellow-400"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Drawer for Mobile */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-56 bg-gray-900 text-white p-4 transform transition-transform duration-300 z-50 
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center gap-2 mb-8">
          <AlertTriangle className="w-8 h-8 text-yellow-400" />
          <h1 className="text-lg md:text-xl font-bold leading-tight">RescueApp!</h1>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
                  isActive
                    ? "bg-yellow-500 text-gray-900"
                    : "hover:bg-gray-800"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-10 md:mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm md:text-base"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
