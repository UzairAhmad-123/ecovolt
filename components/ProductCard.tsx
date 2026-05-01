import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

type Props = {
  product: any;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};
export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
}: Props) {
  return (
    <div className="relative bg-white rounded-xl shadow p-4 hover:shadow-2xl transition">

  {/* IMAGE */}
  <div className="relative w-full h-[180px] mb-3 overflow-hidden rounded-lg">
    <Image
      src={product.image || "/battery1.jpg"}
      alt={product.name}
      fill
      sizes="(max-width: 768px) 100vw, 25vw"
      className="object-cover"
    />

    {/* ❤️ Wishlist */}
    <button
      onClick={() => toggleWishlist(product._id)}
      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
    >
      <FaHeart
        className={`${
          wishlist.includes(product._id)
            ? "text-red-500"
            : "text-gray-300"
        }`}
      />
    </button>
  </div>

  {/* INFO */}
  <h2 className="font-semibold text-sm line-clamp-2">
    {product.name}
  </h2>

  <p className="text-green-600 font-bold mt-1">
    Rs {product.price}
  </p>

  {/* BUTTONS */}
  <Link href={`/product/${product._id}`}>
    <button className="w-full mt-3 bg-black text-white py-2 rounded hover:bg-gray-800">
      View Product
    </button>
  </Link>

  <a
    href={`https://wa.me/923179606923?text=${encodeURIComponent(
      `🛒 Order Request\n\nProduct: ${product.name}\nPrice: Rs ${product.price}`
    )}`}
    target="_blank"
  >
    <button className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600">
      Order on WhatsApp
    </button>
  </a>

</div>
  )
}