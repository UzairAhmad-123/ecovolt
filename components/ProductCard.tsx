import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4">

      <div className="relative w-full h-40 mb-3">
        <Image
          src={product.image || "/battery1.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          loading="eager"
          className="object-cover rounded"
        />
      </div>

      <h2 className="font-semibold text-sm">{product.name}</h2>

      <p className="text-gray-600 text-xs mt-1">
        Capacity: {product.capacity}
      </p>

      <p className="text-green-600 font-bold mt-2">
        Rs {product.price}
      </p>

      <Link href={`/product/${product.id}`}>
        <button className="w-full mt-3 bg-black text-white py-2 rounded">
          View Product
        </button>
      </Link>

    </div>
  );
}