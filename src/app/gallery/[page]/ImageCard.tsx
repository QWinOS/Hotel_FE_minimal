"use client";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import React, { useEffect, useState, useId } from "react";

import "photoswipe/style.css";
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function BlurImage({ data }: { data: any }) {
  const [isLoading, setLoading] = useState(true);
  const image = data.image || data;

  const imgURL = image?.url;
  const reactId = useId();
  const galleryId = `gallery-${image?.id || reactId}`;

  useEffect(() => {
    if (!imgURL) return;
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, [galleryId, imgURL]);

  if (!imgURL) {
    return null;
  }

  return (
    <div id={galleryId} className="w-full group">
      <a
        href={imgURL}
        data-pswp-width={image.width || 1200}
        data-pswp-height={image.height || 800}
        target="_blank"
        rel="noreferrer"
      >
        <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
          <Image
            alt={image.alternativeText || "Gallery image"}
            src={imgURL}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover duration-700 ease-in-out",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoad={() => setLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-bold text-white drop-shadow-md">
              {image.caption || ""}
            </h3>
            <p className="text-sm text-white/80 drop-shadow-md">
              {image.alternativeText || ""}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
