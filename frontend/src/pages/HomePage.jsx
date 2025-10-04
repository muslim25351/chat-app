import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import MessageInput from "../components/MessageInput.jsx";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[87vh] bg-base-200 flex flex-col">
      <div className="flex-1 flex items-center justify-center pt-5 px-4 min-h-0">
        <div className="bg-base-100 rounded-lg shadow-lg w-full h-full flex flex-col">
          <div className="flex-1 flex rounded-lg overflow-hidden min-h-0">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Chat section (messages + input) */}
            <div className="flex-1 flex flex-col min-h-0">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto min-h-0">
                    <ChatContainer />
                  </div>

                  {/* Message Input always at bottom */}
                  <div className="flex-shrink-0  bg-base-100 p-2">
                    <MessageInput />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
