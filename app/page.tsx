"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";



export default function Home() {

const [wishlist, setWishlist] = useState<number[]>([]);
const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(300000);


// 🔥 LOAD from localStorage
useEffect(() => {
  const saved = localStorage.getItem("wishlist");
  if (saved) {
    setWishlist(JSON.parse(saved));
  }
   }, []);
  

  // 🔥 SAVE to localStorage
useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  
  const toggleWishlist = (id: number) => {
  if (wishlist.includes(id)) {
    setWishlist(wishlist.filter((item) => item !== id));
  } else {
    setWishlist([...wishlist, id]);
  }
};

  const filteredProducts = products.filter((p: any) => {
  const matchCategory =
    category === "all" || p.category === category;

  const matchPrice = p.price <= maxPrice;

  return matchCategory && matchPrice;
});


  return (
    
    <main className="min-h-screen bg-gray-50">

      <div className="p-6 flex flex-wrap gap-4 items-center">

  {/* CATEGORY */}
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

  {/* PRICE */}
  <div>
    <label className="text-sm">Max Price: Rs {maxPrice}</label>
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

      

      <Navbar />

      {/* NAVBAR */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="font-bold text-xl">Solar Store</h1>

        <div className="flex gap-4 text-sm">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </div>
      </header>
      

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-16">
  <h1 className="text-4xl font-bold">
    Premium Solar Batteries in Pakistan
  </h1>

  <p className="mt-2 text-sm">
    Long Backup • Warranty • Cash on Delivery
  </p>

  <button className="mt-6 bg-black px-6 py-2 rounded">
    Shop Now
  </button>
</section>


      {/* CATEGORIES */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white p-4 rounded shadow text-center">
            Tubular Batteries
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            Lithium Batteries
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            Solar Panels
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            Inverters
          </div>
          

          

        </div>
      </section>
      {/* PRODUCTS */}
<section className="p-6">
  <h2 className="text-2xl font-bold mb-4">
    Featured Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
 {filteredProducts.map((product) => (
 <ProductCard
  key={product.id}
  product={product}
  wishlist={wishlist}
  toggleWishlist={toggleWishlist}
/>
))}
  
</div>
</section>


    </main>
  );
}