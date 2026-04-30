"use client";

import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentProof, setPaymentProof] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleImage = (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setPaymentProof(reader.result as string);
  };
  reader.readAsDataURL(file);
};
  
const placeOrder = async () => {
  if (!name || !phone || !address) {
    alert("Fill all fields");
    return;
  }

  if (paymentMethod !== "cod" && !paymentProof) {
    alert("Upload payment screenshot");
    return;
  }

  await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      address,
      items: cart,
      total,
      paymentMethod,
      paymentProof,
    }),
  });

  // ✅ CLEAR CART PROPERLY
  localStorage.removeItem("cart");

  // ✅ REDIRECT
  window.location.href = "/success";
};

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* INPUTS */}
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <textarea
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      {/* PAYMENT METHOD */}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Select Payment Method</h3>

        <div className="space-y-2">

          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              value="easypaisa"
              checked={paymentMethod === "easypaisa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            EasyPaisa
          </label>

          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              value="jazzcash"
              checked={paymentMethod === "jazzcash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            JazzCash
          </label>

          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Bank Transfer
          </label>
          

        </div>
        
      </div>
      {paymentMethod !== "cod" && (
  <div className="mt-3">
    <label className="block text-sm mb-1">
      Upload Payment Screenshot
    </label>

    <input type="file" onChange={handleImage} />

    {paymentProof && (
      <img
        src={paymentProof}
        className="w-24 h-24 mt-2 object-cover"
      />
    )}
  </div>
)}

      {/* TOTAL */}
      <h2 className="font-bold mt-4">Total: Rs {total}</h2>

      <button
  onClick={placeOrder}
  className="w-full bg-black text-white py-2 mt-4"
>
  Place Order
</button>

    </div>
  );
}