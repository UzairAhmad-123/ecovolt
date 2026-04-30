"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const phoneNumber = "923179606923";

  const [message, setMessage] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
      setMessage(
        encodeURIComponent("Hello, I want to ask about your products.")
      );
    } else {
      const items = cart
        .map(
          (item: any) =>
            `${item.name} (x${item.quantity}) - Rs ${item.price * item.quantity}`
        )
        .join("\n");

      setMessage(
        encodeURIComponent(`🛒 I want to order:\n\n${items}`)
      );
    }
  }, []);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg"
    >
      💬
    </a>
  );
}