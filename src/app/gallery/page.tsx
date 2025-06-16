import React, { use } from "react";
import { BlurImage } from "./ImageCard";
import { Load } from "@/components/Framer";
import PaginationControls from "@/components/PaginationControls";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

async function getImageListFromStrapi(page: string | string[]) {
  try {
    const fetchParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
           {
            galleries_connection(
              pagination: { page: 1, pageSize: 8 }
              sort: "updatedAt"
            ) {
              pageInfo {
                pageCount
                page
                pageSize
              }
              nodes {
                image {
                  url
                  caption
                  alternativeText
                }
              }
            }
          }
        `,
      }),
    };
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();
    console.log({ data });
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blog posts!" };
  }
}

export default async function Gallery({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Await searchParams if it's a Promise (Next.js 14+)
  const params =
    typeof searchParams === "object" && searchParams !== null
      ? searchParams
      : {};
  const page = params["page"] ?? "1";
  const galleryList = await getImageListFromStrapi(page);
  console.log({ galleryList });
  var blogDataArray = galleryList.props.galleries_connection.nodes;
  var totalPage: number =
    galleryList.props.galleries_connection.pageInfo.pageCount;

  return (
    <>
      <Load index={1}>
        <h1
          className="mx-5 mb-0 justify-items-center
        text-center
        text-4xl
        font-bold
        uppercase
        leading-loose
        tracking-wide
        text-[#4B3221]
        subpixel-antialiased
        dark:text-[#D6D6D8]
        sm:pb-6
        sm:pt-24
        sm:text-6xl
        "
        >
          showcase
        </h1>
      </Load>
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Object.values(blogDataArray).map((blog: any, i: number) => {
            var attributes = blog;
            return (
              <Load index={i} key={i}>
                <BlurImage props={attributes} key={i} />
              </Load>
            );
          })}
        </div>
        <div>
          <div className={totalPage == 1 ? "opacity-0" : "opacity-100"}>
            <PaginationControls
              hasNextPage={Number(page) < totalPage}
              hasPrevPage={Number(page) > 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
