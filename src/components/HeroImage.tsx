"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroImage({ imgURL }: { imgURL?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!imgURL) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={imgURL}
        alt="Hotel Banner"
        fill
        sizes="100vw"
        className={`object-cover brightness-50 contrast-125 saturate-150 blur-sm transform scale-110 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        // unoptimized={process.env.NODE_ENV !== "production"}
        // unoptimized={true}
        onLoad={() => setIsLoaded(true)}
        style={{
          transition: "opacity 0.5s ease-in-out",
          willChange: "opacity",
        }}
      />
    </div>
  );
}
