import React from "react";
import { Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <nav className=" shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/">
        <div className="text-2xl font-semibold text-yellow-600">Chat-App</div>
      </Link>

      <div className="flex items-center gap-6 text-slate-300">
        <Link to="/setting">
          <button
            className="flex items-center gap-2 hover:text-yellow-600 transition"
            onClick={() => console.log("Settings clicked")}
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </Link>

        {authUser && (
          <>
            <Link to="/profile">
              <button
                className="flex items-center gap-2 hover:text-yellow-600 transition"
                onClick={() => console.log("Profile clicked")}
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            </Link>
            <Link to="/login">
              {" "}
              <button
                className="flex items-center gap-2 hover:text-red-500 transition"
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
