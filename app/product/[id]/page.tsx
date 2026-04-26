import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import Reviews from "@/components/Reviews";

export default function ProductPage({ params }: any) {
  const product = products.find((p: any) => p.id === Number(params.id));

  if (!product) return <div>Product not found</div>;

  return (
    <main className="p-6 md:p-10 bg-white min-h-screen">

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT - IMAGES */}
        <ProductGallery images={product.images} />

        {/* RIGHT - DETAILS */}
        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="mt-3">
            <span className="text-2xl text-green-600 font-bold">
              Rs {product.price}
            </span>

            {product.oldPrice && (
              <span className="ml-3 line-through text-gray-400">
                Rs {product.oldPrice}
              </span>
            )}
          </div>

          {/* DISCOUNT BADGE */}
          {product.oldPrice && (
            <div className="mt-2 inline-block bg-red-500 text-white px-3 py-1 text-sm rounded">
              SALE
            </div>
          )}

          <p className="mt-4">
            Capacity: {product.capacity}
          </p>

          <p>Brand: {product.brand}</p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">

            <button className="w-full bg-black text-white py-3 rounded">
              Buy Now
            </button>

            <AddToCartButton product={product} />

            <Reviews productId={product.id} />

          </div>
          

        </div>
      </div>

    </main>
  );
}