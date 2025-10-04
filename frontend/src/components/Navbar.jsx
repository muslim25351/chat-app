import React from "react";
import { Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <nav className="navbar bg-base-100 shadow-md px-6 py-2">
      <div className="flex-1">
        <Link to="/">
          <div className="text-2xl font-semibold text-primary">Chat-App</div>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <ThemeSelector />
        <Link to="/setting">
          <button className="btn btn-ghost btn-sm">
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </Link>

        {authUser && (
          <>
            <Link to="/profile">
              <button className="btn btn-ghost btn-sm">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            </Link>
            <Link to="/login">
              <button
                className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
