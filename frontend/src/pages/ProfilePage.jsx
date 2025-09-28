import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(authUser?.profilePic || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      // Update only profilePic
      updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex flex-col max-w-xl bg-base-300 rounded-xl items-center justify-between mx-auto p-6 py-8">
      <h2 className="text-yellow-600 text-xl font-medium mb-4">
        Update your profile
      </h2>

      {/* Profile Picture */}
      <div className="relative w-28 h-28 mx-auto my-4">
        <img
          className="w-28 h-28 border-amber-400 rounded-full border-4 object-cover"
          src={selectedImg || "/images.jpg"}
          alt="profile"
        />
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Camera className="w-7 h-7 text-yellow-600 absolute -bottom-1 -right-1 bg-white rounded-full p-1 border-2 border-amber-400" />
        </label>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="avatar-upload"
          onChange={handleImageUpload}
          disabled={isUpdatingProfile}
        />
      </div>

      <p className="text-sm mx-auto text-slate-500">
        {isUpdatingProfile
          ? "Uploading..."
          : "Click camera icon to upload profile picture"}
      </p>

      {/* Full Name (Read-only) */}
      <div className="flex flex-col gap-2 w-full mt-4">
        <label className="flex flex-row items-center gap-2 font-medium">
          <User className="w-4 h-4" />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          value={authUser?.fullName || ""}
          readOnly
          disabled
          className="border rounded-lg border-gray-300 p-2 bg-zinc-300 text-gray-600"
        />
      </div>

      {/* Email (Read-only) */}
      <div className="flex flex-col gap-2 w-full mt-4">
        <label className="flex flex-row items-center gap-2 font-medium">
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </label>
        <input
          type="email"
          value={authUser?.email || ""}
          readOnly
          disabled
          className="border rounded-lg border-gray-500 p-2 bg-zinc-300 text-gray-600"
        />
      </div>

      {/* Account Info */}
      <div className="mt-6 bg-base-300 rounded-xl p-6 w-full">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-zinc-700">
            <span>Member Since</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
