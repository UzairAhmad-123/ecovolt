import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // ✅ FIX

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="p-10 bg-white text-black min-h-screen">
      <Navbar />

      <h1 className="text-3xl font-bold">
        {product.name}
      </h1>

      <p className="text-green-600 text-xl mt-2">
        Rs {product.price}
      </p>

      <p className="mt-4">
        Capacity: {product.capacity}
      </p>

      <p>Brand: {product.brand}</p>

      <p className="mt-4">
        {product.description}
      </p>

      <div className="mt-6 space-y-3">

        <button className="w-full bg-black text-white py-3 rounded">
          Buy Now
        </button>

        <AddToCartButton product={product} />

      </div>

    </main>
  );
}