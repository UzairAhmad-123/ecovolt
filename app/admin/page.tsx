"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("battery");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState<string | null>(null);

  // LOAD
 

  useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/test");
    const data = await res.json();
    setProducts(data);
  };

  fetchProducts();
}, []);
  

  // ADD OR UPDATE
 const handleSubmit = async () => {
  if (!name || !price) {
    alert("Fill all fields");
    return;
  }

  await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify({
      name,
      price: Number(price),
      category,
      image: image || "/battery1.jpg",
    }),
  });

  alert("Product Added!");

  // reload products
  const res = await fetch("/api/test");
  const data = await res.json();
  setProducts(data);

  setName("");
  setPrice("");
  setImage("");
};

  // DELETE
 const deleteProduct = async (id: string) => {
  if (!id) return; // safety

  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  setProducts(products.filter((p) => p._id !== id));
};
  // EDIT
  const editProduct = (p: any) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(p.images?.[0] || "");
  };

  // IMAGE UPLOAD
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Admin Panel
      </h1>

      {/* FORM */}
      <div className="space-y-3">

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="battery">Battery</option>
          <option value="solar">Solar</option>
          <option value="inverter">Inverter</option>
        </select>

        {/* IMAGE */}
        <input type="file" onChange={handleImage} />

        {image && (
          <img src={image} className="w-24 h-24 object-cover" />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>

      </div>

      {/* LIST */}
      <div className="mt-8">
        <h2 className="font-bold mb-2">Products</h2>

        {products.map((p) => (
          <div
            key={p._id}
            className="border p-3 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm">Rs {p.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editProduct(p)}
                className="px-2 py-1 bg-yellow-400 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="px-2 py-1 bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}