import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import AuthImagePatter from "../components/AuthImagePatter.jsx";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className=" min-h-screen flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto p-6  rounded-2xl shadow-xl">
          <h1 className="text-3xl font-semibold text-center mb-2 text-yellow-600">
            Welcome back!
          </h1>
          <p className="text-xs text-gray-500 text-center mb-4">
            Sign in to your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-400">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4  pointer-events-none z-10" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
                  className={`input input-bordered w-full max-w-sm pl-10 focus:outline-none  focus:border-yellow-600`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  //className=" pl-10 p-1.5 w-full rounded-md bg-gray-100  text-gray-400 border border-gray-300  focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="......"
                  className={`input input-bordered w-full max-w-sm pl-10 pr-10 focus:outline-none focus:border-yellow-600`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10  focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-md transition duration-200"
            >
              {isLoggingIn ? (
                <>
                  <Loader className="size-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?
              <span>
                <Link to="/signup" className="text-yellow-600 hover:underline ">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-auto">
        <AuthImagePatter
          title="Welcome to our platform"
          subtitle="Create an account to get started and start your journey to success"
        />
      </div>
    </div>
  );
}
