
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import Reviews from "@/components/Reviews";

export default async function ProductPage({ params }: any) {
  const resolvedParams = await params;

  const product = products.find(
    (p: any) => p.id === Number(resolvedParams.id)
  );

  function getRating(productId: number) {
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

  if (!product) return <div>Product not found</div>;

  return (
    <main className="p-6 md:p-10 bg-white min-h-screen">

      <div className="grid md:grid-cols-2 gap-10">

        <ProductGallery images={product.images} />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl text-green-600">
            Rs {product.price}
          </p>

          <AddToCartButton product={product} />
        </div>

      </div>

      {/* ✅ NOW THIS WILL SHOW */}
      <div className="mt-12 bg-yellow-100 p-6">
        TEST REVIEWS SECTION
      </div>

      <Reviews productId={product.id} />

    </main>
  );
}