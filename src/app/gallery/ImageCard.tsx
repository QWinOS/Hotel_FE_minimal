"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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

  return (
    <Link href={imgURL} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          alt=""
          loading="lazy"
          src={imgURL}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%" }}
          className={cn(
            "object-cover duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </Link>
  );
}
