import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition">

  <div className="relative w-full h-[160px] mb-3">
    <img
      src={product.images?.[0]}
      className="w-full h-full object-contain"
      alt={product.name}
    />
  </div>

  <h2 className="font-semibold text-sm">{product.name}</h2>

  <p className="text-gray-500 text-xs">{product.capacity}</p>

  <p className="text-green-600 font-bold">
    Rs {product.price}
  </p>

  <a
    href={`https://wa.me/923179606923?text=${encodeURIComponent(
      `🛒 Order Request\n\nProduct: ${product.name}\nPrice: ${product.price}`
    )}`}
    target="_blank"
  >
    <button className="w-full mt-3 bg-green-500 text-white py-2 rounded">
      Order on WhatsApp
    </button>
  </a>

</div>
  );
}