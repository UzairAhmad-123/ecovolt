"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: any) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="relative w-full h-80 mb-4">
        <Image
          src={selected}
          alt="product"
          fill
          className="object-cover rounded"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3">
        {images.map((img: string, i: number) => (
          <div
            key={i}
            onClick={() => setSelected(img)}
            className="relative w-20 h-20 cursor-pointer border"
          >
            <Image
              src={img}
              alt="thumb"
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}