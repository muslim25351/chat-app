import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeleton/SidebarSkeleton.jsx";
import { Users } from "lucide-react";

export default function Sidebar() {
  const {
    getUsers,
    users,
    isUsersLoading,
    selectedUser,
    setSelectedUser,
  } = useChatStore();

  const onlineUsers = [];
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUsersLoading) {
    return (
      <div>
        <SidebarSkeleton />
      </div>
    );
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* to do the online users */}
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user._id)}
            className={`w-full px-4 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/images.jpg"}
                alt={user.fullName}
                className=" size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            {/* user info online or ofline */}
            <div className="hidden lg:block text-left min-w-0">
              <span className="font-medium truncate">{user.fullName}</span>
              <br />
              <span className="text-sm text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
