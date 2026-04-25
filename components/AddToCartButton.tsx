"use client";

import { addToCart } from "@/lib/cart";

export default function AddToCartButton({ product }: any) {
  if (!product) return null;

  return (
    <button
      onClick={() => {
        addToCart(product);
       console.log("Added to cart");
      }}
      className="w-full border border-black py-3 rounded mt-3"
    >
      Add to Cart
    </button>
  );
}