"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Ecovolt"
          width={40}
          height={40}
          style={{ height: "auto" }}
        />
        <span className="font-bold text-xl text-[var(--primary)]">
          ECOVOLT
        </span>
      </Link>

      {/* MENU */}
      <div className="flex gap-6 items-center">

        <Link href="/">Home</Link>

        <Link href="/cart" className="relative">
          Cart 🛒

          {/* 🔥 CART COUNT */}
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </Link>

      </div>

    </header>
  );
}