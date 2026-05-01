"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("battery");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Check admin login
  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      window.location.href = "/admin/login";
    }
  }, []);

  // ✅ Load products
  const loadProducts = async () => {
   const res = await fetch(`/api/products`); 
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ ADD or UPDATE
  const handleSubmit = async () => {
    if (!name || !price) {
      alert("Fill all fields");
      return;
    }

    const body = {
      name,
      price: Number(price),
      category,
      image: image || "/battery1.jpg",
    };

    if (editId) {
      // 🔄 UPDATE
      await fetch(`/api/products/${editId}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      alert("Product Updated!");
      setEditId(null);
    } else {
      // ➕ ADD
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(body),
      });

      alert("Product Added!");
    }

    // 🔄 reload
    await loadProducts();

    // 🔄 reset
    setName("");
    setPrice("");
    setImage("");
  };

  // ❌ DELETE
  const deleteProduct = async (id: string) => {
    if (!id) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  // ✏️ EDIT
  const editProduct = (p: any) => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(p.image || "");
  };

  // 🖼 IMAGE UPLOAD
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
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

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
          <img src={image} className="w-24 h-24 object-cover rounded" />
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
                onClick={() => deleteProduct(p._id)}
                className="px-2 py-1 bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/admin/login";
          }}
          className="mt-4 w-full bg-red-500 text-white py-2"
        >
          Logout
        </button>
      </div>
    </main>
  );
}