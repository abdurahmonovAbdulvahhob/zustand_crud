import React, { useState, useEffect } from "react";
import useUserStore from "../zustand";

export default function User() {
  const { users, addUser, updateUser, deleteUser, loadUsers } = useUserStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, form);
      setEditingId(null);
    } else {
      addUser({ ...form, id: Date.now() });
    }
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setEditingId(user.id);
  };

  return (
    <div className="p-10 bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Users
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 shadow-xl rounded-lg px-6 py-10 max-w-lg mx-auto mb-10"
      >
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          {editingId ? "Update" : "Create"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Name</label>
          <input
            type="text"
            placeholder="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Tel
          </label>
          <input
            type="text"
            placeholder="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Address</label>
          <input
            type="text"
            placeholder="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="max-w-4xl mx-auto space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-white">
            Users not found!
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:shadow-lg transition border border-gray-200"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-gray-600">{user.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500 transition font-medium"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
