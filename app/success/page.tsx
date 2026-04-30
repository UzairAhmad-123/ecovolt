"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-6 text-center">

      <h1 className="text-3xl font-bold text-green-600">
        ✅ Order Placed Successfully!
      </h1>

      <p className="mt-2">
        Thank you for your order. We will contact you soon.
      </p>

      <Link href="/">
        <button className="mt-6 bg-black text-white px-6 py-2">
          Back to Home
        </button>
      </Link>

    </div>
  );
}