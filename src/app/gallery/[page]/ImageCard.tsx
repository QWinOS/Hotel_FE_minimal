"use client";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import React, { useEffect, useState } from "react";

import "photoswipe/style.css";
const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function BlurImage({ props }: any) {
  const [isLoading, setLoading] = useState(true);
  var { image } = props;
  var imgURL = image.url;
  imgURL = URL + imgURL;
  const galleryId = "room-photoswipe-gallery";
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);
  return (
    <div id={galleryId} className="w-full">
      <a href={imgURL} data-pswp-width={1200} data-pswp-height={800}>
        <div className="relative h-[300px] sm:h-[600px]">
          <Image
            alt=""
            loading="lazy"
            src={imgURL}
            fill
            sizes="100vw"
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:opacity-75",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoad={() => setLoading(false)}
          />
          <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {image.username}
          </p>
        </div>
      </a>
    </div>
  );
}
