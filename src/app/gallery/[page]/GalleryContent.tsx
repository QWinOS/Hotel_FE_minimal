// app/gallery/GalleryContent.tsx
import React, { Suspense } from "react";
import { BlurImage } from "./ImageCard";
import PaginationControls from "@/components/PaginationControls";
import { Load } from "@/components/Framer";

// Types
interface GalleryImage {
  image: {
    url: string;
    caption?: string;
    alternativeText?: string;
  };
}

interface GalleryResponse {
  galleries_connection: {
    pageInfo: {
      pageCount: number;
      page: number;
      pageSize: number;
    };
    nodes: GalleryImage[];
  };
}

// const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
// const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
// const URL = `${host}:${port}`;
// const URL =
//   process.env.NEXT_PUBLIC_STRAPI_API_URL ||
//   `${process.env.NEXT_PUBLIC_STRAPI_API_HOST}:${process.env.NEXT_PUBLIC_STRAPI_API_PORT}`;

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;
async function getImageListFromStrapi(page: number): Promise<GalleryResponse> {
  const res = await fetch(`${BASE_API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        {
          galleries_connection(
            pagination: { page: ${page}, pageSize: 8 }
            sort: "updatedAt"
          ) {
            pageInfo { pageCount page pageSize }
            nodes {
              image { url caption alternativeText }
            }
          }
        }
      `,
    }),
    cache: "no-store", // Dynamic content, don't cache
  });

  if (!res.ok) throw new Error("Failed to fetch gallery data");

  const { data } = await res.json();
  return data;
}

export default async function GalleryContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNumber = parseInt(page, 10) || 1;

  try {
    const galleryData = await getImageListFromStrapi(pageNumber);
    const blogDataArray = galleryData.galleries_connection.nodes;
    const totalPage = galleryData.galleries_connection.pageInfo.pageCount;

    return (
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {blogDataArray.map((blog, i) => (
            <Load index={i} key={i}>
              <BlurImage data={blog} key={i} />
            </Load>
          ))}
        </div>

        <div className={totalPage === 1 ? "opacity-0" : "opacity-100"}>
          <PaginationControls currentPage={pageNumber} totalPage={totalPage} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Failed to load gallery data. Please try again later.
      </div>
    );
  }
}
