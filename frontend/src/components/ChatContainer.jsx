import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./skeleton/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-0 pb-20">
        <div className="flex-shrink-0">
          <ChatHeader />
        </div>
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col min-h-0 pb-20  ">
      <div className="flex-shrink-0  sticky top-0 z-10 bg-base-100 ">
        <ChatHeader />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message, index) => {
          // Check if this is the first message of a new day
          const currentDate = new Date(message.createdAt).toDateString();
          const previousDate =
            index > 0
              ? new Date(messages[index - 1].createdAt).toDateString()
              : null;
          const showDate = currentDate !== previousDate;

          return (
            <div key={message._id}>
              {/* Show date only when it changes */}
              {showDate && (
                <div className="text-center text-xs text-gray-500 my-3">
                  {new Date(message.createdAt).toLocaleDateString("en-us", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}

              <div
                className={`chat ${
                  message.senderId === authUser._id ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={
                        message.senderId == authUser._id
                          ? authUser.profilePic || "/images.jpg"
                          : selectedUser.profilePic || "/images.jpg"
                      }
                      alt="image/jpg"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1 flex flex-col">
                  <time className="text-xs opacity-50 ml-1">
                    {new Date(message.createdAt).toLocaleTimeString("en-us", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <div className="chat-bubble flex flex-col p-2 rounded">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="message image"
                        className="lg:max-w-[200px] rounded-md object-cover"
                      />
                    )}
                    {message.text && <p className="text-sm">{message.text}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
