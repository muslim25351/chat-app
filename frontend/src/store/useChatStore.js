import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data, isUsersLoading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    if (!userId) {
      console.warn("getMessages called with undefined userId");
      return;
    }
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data, isMessagesLoading: false });
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response?.data || error.message
      );
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, response.data] });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error.response.data);
      toast.error("Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      return;
    }

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set({ messages: [...messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  //to be improved later
  setSelectedUser: (user) => {
    if (user === null) {
      set({ selectedUser: null });
    } else {
      set({ selectedUser: { ...user } });
    }
  },
}));
