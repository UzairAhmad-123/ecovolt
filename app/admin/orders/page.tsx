"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  useEffect(() => {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    window.location.href = "/admin/login";
  }
}, []);

  const updateStatus = async (id: string, status: string) => {
  await fetch(`/api/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  // reload orders
  const res = await fetch("/api/orders");
  const data = await res.json();
  setOrders(data);
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
{orders.map((o) => (
  <div key={o._id} className="border p-4 mb-4">
    <p><b>Name:</b> {o.name}</p>
    <p><b>Phone:</b> {o.phone}</p>
    <p><b>Address:</b> {o.address}</p>
    <p><b>Total:</b> Rs {o.total}</p>

    {/* STATUS */}
    <p className="mt-2">
      <b>Status:</b>{" "}
      <span className="text-blue-600">{o.status}</span>
    </p>

    {/* ACTIONS */}
    <div className="flex gap-2 mt-2">

      <button
        onClick={() => updateStatus(o._id, "delivered")}
        className="bg-green-500 text-white px-2 py-1 text-sm"
      >
        Delivered
      </button>

      <button
        onClick={() => updateStatus(o._id, "cancelled")}
        className="bg-red-500 text-white px-2 py-1 text-sm"
      >
        Cancel
      </button>

    </div>
  </div>
))}
    </div>
  );
}