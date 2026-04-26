"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // ❌ REMOVE ITEM
  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ➕ INCREASE
  const increaseQty = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ➖ DECREASE
  const decreaseQty = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 const handleWhatsAppOrder = () => {
  if (!name || !phone || !address) {
    alert("Please fill all fields");
    return;
  }

  const items = cart
    .map(
      (item) =>
        `${item.name} (x${item.quantity}) - Rs ${item.price * item.quantity}`
    )
    .join("%0A");

  const message = `🛒 *New Order*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

📦 Order Details:
${cart
  .map(
    (item) =>
      `• ${item.name} (x${item.quantity}) - Rs ${item.price * item.quantity}`
  )
  .join("\n")}

💰 Total: Rs ${total}`;

  const phoneNumber = "923179606923";

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

  // ✅ CLEAR CART AFTER ORDER
  localStorage.removeItem("cart");
  setCart([]);

  // ✅ CLEAR INPUTS
  setName("");
  setPhone("");
  setAddress("");
};

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
       <div className="text-center mt-10">
  <p className="text-gray-500">🛒 Your cart is empty</p>

  <a href="/" className="mt-4 inline-block text-blue-600 underline">
    Go Shopping
  </a>
</div>
      ) : (
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 shadow rounded"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>

                <div className="flex items-center gap-3 mt-2">

                  {/* ➖ */}
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 border"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  {/* ➕ */}
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 border"
                  >
                    +
                  </button>

                </div>

                <p className="mt-2">Rs {item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          

          {/* 💰 TOTAL */}
          <div className="mt-6 text-xl font-bold">
            Total: Rs {total.toLocaleString()}
          </div>
          <div className="mt-6 space-y-3">
            <div className="mt-6 bg-gray-100 p-4 rounded">

  <h2 className="font-semibold mb-2">Order Summary</h2>

  {cart.map((item) => (
    <div key={item.id} className="flex justify-between text-sm">
      <span>{item.name} x{item.quantity}</span>
      <span>Rs {item.price * item.quantity}</span>
    </div>
  ))}

  <div className="border-t mt-2 pt-2 font-bold">
    Total: Rs {total.toLocaleString()}
  </div>

</div>  

<div className="mt-6 space-y-3"></div>

  <input
    type="text"
    placeholder="Your Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border p-2 rounded"
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full border p-2 rounded"
  />

  <textarea
    placeholder="Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full border p-2 rounded"
  />

</div>

         <button
  onClick={handleWhatsAppOrder}
  disabled={cart.length === 0}
  className={`mt-4 w-full py-3 rounded font-semibold ${
    cart.length === 0
      ? "bg-gray-400"
      : "bg-green-600 hover:bg-green-700 text-white"
  }`}
>
  Order on WhatsApp
</button>
          

        </div>
      )}

    </main>
  );
}