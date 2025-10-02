import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) {
    return <div>Loading messages...</div>;
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>messsages...</p>
      <MessageInput />
    </div>
  );
}
