"use client";

import { useEffect, useState } from "react";

export default function Reviews({ productId }: any) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Load reviews
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(`reviews_${productId}`) || "[]"
    );
    setReviews(stored);
  }, [productId]);

  // Add review
  const addReview = () => {
    if (!name || !comment) {
      alert("Fill all fields");
      return;
    }

    const newReview = {
      name,
      rating,
      comment,
    };

    const updated = [newReview, ...reviews];

    setReviews(updated);
    localStorage.setItem(
      `reviews_${productId}`,
      JSON.stringify(updated)
    );

    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

      {/* ADD REVIEW */}
      <div className="bg-gray-100 p-4 rounded space-y-3">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={addReview}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>

      </div>

      {/* SHOW REVIEWS */}
      <div className="mt-6 space-y-4">

        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet
          </p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">

              <p className="font-semibold">{r.name}</p>

              <p className="text-yellow-500">
                {"⭐".repeat(r.rating)}
              </p>

              <p className="text-gray-600 mt-1">
                {r.comment}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}