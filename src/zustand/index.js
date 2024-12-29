import {create} from "zustand";

const useUserStore = create((set) => ({
  users: JSON.parse(localStorage.getItem("users")) || [],

  loadUsers: () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    set({ users: storedUsers });
  },

  addUser: (user) =>
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    }),

  updateUser: (id, updatedData) =>
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    }),

  deleteUser: (id) =>
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    }),
}));

export default useUserStore;
