import PaginationControls from "@/components/PaginationControls";
import { Suspense } from "react";
import { BlurImage } from "../gallery/[page]/ImageCard";
import { Load } from "@/components/Framer";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;

async function getMenuImageListFromStrapi() {
  // console.log("Page Inside -> " + page);
  // let p: number | Number = page;
  try {
    const fetchParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            {
              dinning (status: PUBLISHED){
                menu (sort: ["publishedAt:desc"]){
                  publishedAt
                  url
                }
              }
            }
        `,
      }),
    };
    // console.log("Body => " + fetchParams.body);
    const res = await fetch(`${BASE_API_URL}/graphql`, fetchParams);
    const { data } = await res.json();

    if (data?.dinning?.menu) {
      data.dinning.menu = data.dinning.menu.map((item: any) => ({
        ...item,
        url: item.url,
      }));
    }

    // console.log({ data });
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch dinning images!" };
  }
}

export default async function Menu() {
  const menuList = await getMenuImageListFromStrapi();
  return (
    <div className="min-h-screen py-8 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-40 font-sans bg-gradient-to-br from-[#F8FAFC] via-[#E5EDF1] to-[#8ECAE6]">
      <div className="relative z-10">
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
            menu
          </h1>
        </Load>
        <div className="px-2 sm:px-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 py-2">
            {Object.values(menuList.props?.dinning?.menu).map(
              (blog: any, i: number) => {
                var attributes = blog;
                return (
                  <Load index={i} key={i}>
                    <BlurImage data={attributes} key={i} />
                  </Load>
                );
              }
            )}
          </div>
          <div>
            <div className="opacity-0">
              <Suspense fallback={<div>Loading...</div>}>
                <PaginationControls currentPage={1} totalPage={1} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
