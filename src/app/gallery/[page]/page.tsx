import { Load } from "@/components/Framer";
import { getGraphQLOutput } from "@/components/GraphQL";
import PaginationControls from "@/components/PaginationControls";
import Individual_Room from "@/components/Room";
import { BlurImage } from "./ImageCard";
const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
async function getImageListFromStrapi(page: number) {
  try {
    const fetchParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetGalleries($page: Int!) {
            galleries_connection(
              pagination: { page: $page, pageSize: 6 }
              sort: "updatedAt:desc"
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
                  width
                  height
                }
              }
            }
          }
        `,
        variables: { page },
      }),
    };
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return { error: "Failed to fetch gallery images!" };
  }
}
// This also gets called at build time

export default async function Gallery({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10) || 1;

  const galleryData = await getImageListFromStrapi(pageNumber);

  if (galleryData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{galleryData.error}</p>
      </div>
    );
  }

  const { nodes: images, pageInfo } = galleryData.props.galleries_connection;
  const { pageCount: totalPage, page: currentPage } = pageInfo;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <Load index={1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center text-slate-900 mb-12">
            Showcase
          </h1>
        </Load>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image: any, i: number) => (
            <Load index={i} key={image.id || i}>
              <BlurImage data={image} />
            </Load>
          ))}
        </div>
        <div className="mt-12">
          {totalPage > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPage={totalPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
