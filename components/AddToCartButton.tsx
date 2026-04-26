"use client";

import { addToCart } from "@/lib/cart";

export default function AddToCartButton({ product }: any) {
  if (!product) return null;

  return (
    <button
      onClick={() => {
        addToCart(product);
       window.dispatchEvent(new Event("cartUpdated"));
      }}
     className="bg-[var(--primary)] hover:bg-green-700 text-white py-3 rounded"
    >
      Add to Cart
    </button>
  );
}