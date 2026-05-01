"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

export default function Home() {

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [productsList, setProductsList] = useState<any[]>([]);

  // ✅ LOAD wishlist
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // ✅ SAVE wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ LOAD products from MongoDB API
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products`);

      if (!res.ok) {
        console.error("Error:", res.status);
        return;
      }

      const data = await res.json();

      setProductsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);

  // ✅ wishlist toggle
  const toggleWishlist = (id: string) => {
  if (wishlist.includes(id)) {
    setWishlist(wishlist.filter((item) => item !== id));
  } else {
    setWishlist([...wishlist, id]);
  }
};

  // ✅ filter
  const filteredProducts = productsList.filter((p: any) => {
    const matchCategory = category === "all" || p.category === category;
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchPrice;
  });

  return (
  <main className="min-h-screen bg-gray-50">

    {/* HERO */}
    <section className="bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-20 px-4">

      <h1 className="text-5xl font-extrabold">
        EcoVolt ⚡
      </h1>

      <p className="mt-4 text-xl max-w-xl mx-auto">
        Power your home with high-performance solar batteries.
      </p>

      <p className="mt-2 text-sm opacity-90">
        Long Backup • Warranty • Cash on Delivery
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-black px-6 py-2 rounded hover:scale-105 transition">
          Shop Now
        </button>

        <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
          View Products
        </button>
      </div>

    </section>

    {/* FILTER */}
    <div className="p-6 flex flex-wrap gap-4 items-center justify-between">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="all">All</option>
        <option value="battery">Batteries</option>
        <option value="solar">Solar Panels</option>
        <option value="inverter">Inverters</option>
      </select>

      <div>
        <label className="text-sm">
          Max Price: Rs {maxPrice}
        </label>

        <input
          type="range"
          min="100000"
          max="300000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="ml-2"
        />
      </div>

    </div>

    {/* PRODUCTS */}
    <section className="px-6 pb-10">

      <h2 className="text-3xl font-bold mb-6">
        Featured Products
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
            >
              <ProductCard
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
          ))}
        </div>
      )}

    </section>

  </main>
)}