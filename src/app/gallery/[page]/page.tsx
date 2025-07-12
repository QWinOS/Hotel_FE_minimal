import { Load } from "@/components/Framer";
import { getGraphQLOutput } from "@/components/GraphQL";
import PaginationControls from "@/components/PaginationControls";
import Individual_Room from "@/components/Room";
import { BlurImage } from "./ImageCard";
const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
async function getImageListFromStrapi(page: number | Number) {
  // console.log("Page Inside -> " + page);
  let p: number | Number = page;
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
              pagination: { page: ${p}, pageSize: 6 }
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
    // console.log("Body => " + fetchParams.body);
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();
    // console.log({ data });
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blog posts!" };
  }
}
// This also gets called at build time
export async function generateStaticParams() {
  const character: any = await getGraphQLOutput("gallery_meta", "");
  console.log(character);
  const pageCount = character?.props?.galleries_connection?.pageInfo?.pageCount;

  // Handle edge case: if pageCount is not a valid number
  if (!pageCount || pageCount < 1) {
    return [];
  }
  // Generate array from 1 to pageCount: [1, 2, ..., pageCount]
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Map to the format required by `generateStaticParams`
  return pages.map((page) => ({
    page: page.toString(), // Must be a string
  }));
}

export default async function Gallery({
  params,
}: {
  params: { page: string };
}) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);
  console.log("PAGGGGG -> " + pageNumber);
  // const res = await getGraphQLOutput("gallery_meta", slug);
  // console.log(res);

  // const galleryList = getGraphQLOutput(
  //   "galleries_connection",
  //   pageNumber.toString()
  // );
  const galleryList = await getImageListFromStrapi(pageNumber);
  console.log({ galleryList });
  var blogDataArray = galleryList.props.galleries_connection.nodes;
  var totalPage: number =
    galleryList.props.galleries_connection.pageInfo.pageCount;
  var currentPage: number =
    galleryList.props.galleries_connection.pageInfo.page;
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
      <div className="px-2 sm:px-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 py-2">
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
              currentPage={currentPage}
              totalPage={totalPage}
              // hasNextPage={Number(page) < totalPage}
              // hasPrevPage={Number(page) > 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
