"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔐 Simple auth (change these)
    if (username === "admin" && password === "1234") {
      localStorage.setItem("admin", "true");
      window.location.href = "/admin";
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">

      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-2"
      >
        Login
      </button>

    </div>
  );
}