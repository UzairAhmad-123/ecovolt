"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";
import { products } from "@/data/products";


export default function Navbar() {
  const [count, setCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = products.filter((p: any) =>
  p.name.toLowerCase().includes(query.toLowerCase())
);

  const updateCount = () => {
    const cart = getCart();
    const totalQty = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
    setCount(totalQty);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    return () =>
      window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-50">
        <Link href="/">
          <h1 className="font-bold text-xl">Ecovolt ⚡</h1>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>

          <div className="relative w-1/3">
          <Link href="/admin">Admin</Link>

          <a href="/checkout">
  <button className="bg-green-600 text-white px-4 py-2">
    Checkout
  </button>
</a>
  <input
    type="text"
    placeholder="Search batteries..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full border px-3 py-2 rounded"
  />

  {/* 🔽 DROPDOWN */}
  {query && (
    <div className="absolute top-12 left-0 w-full bg-white shadow rounded z-50 max-h-60 overflow-y-auto">

      {filtered.length === 0 && (
        <p className="p-3 text-sm text-gray-500">
          No products found
        </p>
      )}

      {filtered.map((p: any) => (
        <Link
          key={p._id}
          href={`/product/${p.id}`}
          onClick={() => setQuery("")}
        >
          <div className="p-3 hover:bg-gray-100 cursor-pointer">
            {p.name}
          </div>
        </Link>
      ))}

    </div>
  )}
</div>

          {/* 🛒 CART BUTTON */}
          <button
            onClick={() => setOpenCart(true)}
            className="relative"
          >
            🛒 Cart

            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 🔥 CART DRAWER */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}