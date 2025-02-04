const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

const getQuery = (params: string, queryTerm: string) => {
  switch (params) {
    case "banner":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
                        banner {
                            Left_Aligned_Text
                            Description
                            Pics {
                            url
                            }
                        }
                    }`,
        }),
      };
    case "featured_room":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
                   rooms {
                      Room_Type
                      documentId
                      Description
                      Price
                      Availability
                      Room_Images {
                        url
                      }
                    }
                  }`,
        }),
      };
    case "amenitie":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
                   amenities {
                      Title
                      Description
                      Thumbnail {
                        url
                      }
                    }
                  }`,
        }),
      };
    default:
      return {};
  }
};

export default async function getGraphQLOutput(
  params: string,
  queryTerm: string
): Promise<any> {
  try {
    const res = await fetch(`${URL}/graphql`, getQuery(params, queryTerm));
    const { data } = await res.json();
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.error(error);
  }
}
