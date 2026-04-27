import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

type Props = {
  product: any;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
}: Props) {
  return (
    <div className="relative bg-white rounded-xl shadow p-4 hover:shadow-xl transition">

      <div className="relative w-full h-[160px] mb-3">
        <Image
          src={product.images?.[0] || "/battery1.jpg"}
          alt={product.name}
          fill
          className="object-contain"
        />

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2"
        >
          <FaHeart
            className={`text-xl ${
              wishlist.includes(product.id)
                ? "text-red-500"
                : "text-gray-300"
            }`}
          />
        </button>
      </div>

      <h2 className="font-semibold text-sm">{product.name}</h2>

      <p className="text-gray-500 text-xs">{product.capacity}</p>

      <p className="text-green-600 font-bold">
        Rs {product.price}
      </p>

      <Link href={`/product/${product.id}`}>
        <button className="w-full mt-3 bg-black text-white py-2 rounded">
          View Product
        </button>
      </Link>

      <a
        href={`https://wa.me/923179606923?text=${encodeURIComponent(
          `🛒 Order Request\n\nProduct: ${product.name}\nPrice: ${product.price}`
        )}`}
        target="_blank"
      >
        <button className="w-full mt-2 bg-green-500 text-white py-2 rounded">
          Order on WhatsApp
        </button>
      </a>

    </div>
  );
}