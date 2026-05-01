"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import Reviews from "@/components/Reviews";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  // 🔥 FETCH from MongoDB API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ⭐ Rating function
  function getRating(productId: string) {
    if (typeof window === "undefined") return { avg: 0, count: 0 };

    const stored = JSON.parse(
      localStorage.getItem(`reviews_${productId}`) || "[]"
    );

    if (stored.length === 0) return { avg: 0, count: 0 };

    const total = stored.reduce((sum: number, r: any) => sum + r.rating, 0);

    return {
      avg: total / stored.length,
      count: stored.length,
    };
  }

  if (!product) return <div className="p-6">Loading...</div>;

  const rating = getRating(product._id);

  return (
    <main className="p-6 md:p-10 bg-white min-h-screen">

      <div className="grid md:grid-cols-2 gap-10">

        <ProductGallery images={product.images || ["/battery1.jpg"]} />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl text-green-600 mt-2">
            Rs {product.price}
          </p>

          {/* ⭐ Rating */}
          <p className="mt-2 text-yellow-500">
            ⭐ {rating.avg.toFixed(1)} ({rating.count} reviews)
          </p>

          <AddToCartButton product={product} />
        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-12">
        <Reviews productId={product._id} />
      </div>

    </main>
  );
}