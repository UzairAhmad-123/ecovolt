"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const totalQty = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    setCount(totalQty);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">

      <h1 className="font-bold text-xl">Solar Store</h1>

      <div className="flex items-center gap-6 text-sm">

        <Link href="/">Home</Link>
        <Link href="/product/1">Products</Link>
        <Link href="/contact">Contact</Link>

        {/* 🛒 CART */}
        <Link href="/cart" className="relative">

          <span className="text-xl">🛒</span>

          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {count}
            </span>
          )}

        </Link>

      </div>

    </header>
  );
}