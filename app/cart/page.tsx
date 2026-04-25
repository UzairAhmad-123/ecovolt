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

  const message = `🛒 *New Order* %0A
Name: ${name} %0A
Phone: ${phone} %0A
Address: ${address} %0A
-------------------- %0A
${items} %0A
-------------------- %0A
Total: Rs ${total}`;

  const phoneNumber = "923XXXXXXXXX";

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
        <p>Your cart is empty</p>
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
  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
>
  Order on WhatsApp
</button>
          

        </div>
      )}

    </main>
  );
}