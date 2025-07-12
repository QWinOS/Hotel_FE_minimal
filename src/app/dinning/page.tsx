import PaginationControls from "@/components/PaginationControls";
import { BlurImage } from "../gallery/[page]/ImageCard";
import { Load } from "@/components/Framer";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
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
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();
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
  console.log({ menuList });
  menuList.props?.dinning?.menu;
  // return <>Menu</>;

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
                  <BlurImage props={attributes} key={i} />
                </Load>
              );
            }
          )}
        </div>
        <div>
          <div className="opacity-0">
            <PaginationControls
              currentPage={1}
              totalPage={1}
              // hasNextPage={Number(page) < totalPage}
              // hasPrevPage={Number(page) > 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
