"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const pathname = usePathname();

  const [count, setCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  // 🔄 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // 🛒 Cart count
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

  // 🔍 Search filter
  const filtered = products.filter((p: any) =>
    p.name?.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ MOVE CONDITION HERE (AFTER ALL HOOKS)
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-50">
        <Link href="/">
          <h1 className="font-bold text-xl text-gray-900">
            Ecovolt ⚡
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border px-3 py-2 rounded text-gray-800"
            />

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
                    href={`/product/${p._id}`}
                    onClick={() => setQuery("")}
                  >
                    <div className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800">
                      {p.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admin" className="text-sm text-gray-700">
            Admin
          </Link>

          <Link href="/checkout">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Checkout
            </button>
          </Link>

          <button
            onClick={() => setOpenCart(true)}
            className="relative text-gray-800"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}