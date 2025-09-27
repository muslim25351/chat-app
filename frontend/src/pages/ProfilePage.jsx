import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };
  const handleImageUpload = (e) => {};
  return (
    <div>
      <div className="flex  flex-col max-w-2xl  items-center justify-between mx-auto p-6 py-8">
        <div className="flex flex-col gap-2 items-center justify-center">
          {" "}
          <h2 className="text-yellow-600 text-xl"> update your profile </h2>
          <p className="text-sm text-slate-500">
            You can update your profile information here!
          </p>
        </div>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="avatar-upload"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
          <div className="relative w-24 h-24 mx-auto my-4">
            <img
              className="w-24 h-24 border-amber-400 rounded-full border-2 object-cover"
              src={authUser.avatar}
              alt="../public/images.jpg"
            />
            <Camera className="w-6 h-6 text-yellow-600 cursor-pointer absolute -bottom-1 -right-1 bg-white rounded-full p-1 border-2 border-amber-400" />
          </div>
          <label className="flex flex-col gap-2">
            Full Name
            <input
              type="text"
              value={authUser?.fullName || ""}
              onChange={(e) => updateProfile({ fullName: e.target.value })}
              className="border border-gray-300 p-2 rounded hover:border-yellow-500 transition focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            Email
            <input
              type="email"
              value={authUser?.email || ""}
              onChange={(e) => updateProfile({ email: e.target.value })}
              className="border border-gray-300 p-2 rounded hover:border-yellow-500 transition focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input
              type="password"
              value={authUser?.password || ""}
              onChange={(e) => updateProfile({ password: e.target.value })}
              className="border border-gray-300 p-2 rounded hover:border-yellow-500 transition focus:outline-none"
            />
          </label>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isUpdatingProfile}
            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition"
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
