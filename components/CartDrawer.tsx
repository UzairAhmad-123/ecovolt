"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";

export default function CartDrawer({ open, onClose }: any) {
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* 🔲 BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* 📦 DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between border-b">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border p-3 rounded"
              >
                <h3 className="font-semibold">{item.name}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, "dec")
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, "inc")
                    }
                  >
                    +
                  </button>
                </div>

                <p className="mt-1">
                  Rs {item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* 💰 FOOTER */}
        <div className="p-4 border-t">
          <p className="font-bold">
            Total: Rs {total.toLocaleString()}
          </p>

          <button className="w-full mt-3 bg-black text-white py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}