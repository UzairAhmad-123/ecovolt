import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

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
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
</section>

    </main>
  );
}