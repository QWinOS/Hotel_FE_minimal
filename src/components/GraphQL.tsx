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
    case "roomsDocId":
      return {
        method: "POST",
        next: {
          revalidate: 1,
          cache: "no-store",
        },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
                   rooms {
                      documentId
                    }
                  }`,
        }),
      };
    case "getRoomByDocId":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
                   room(documentId: "${queryTerm}") {
                      Room_Type
                      Room_Images {
                        url
                      }
                      Description
                      Availability
                      Price
                    }
                  }`,
        }),
      };
    default:
      return {};
  }
};

async function fetchPosts(params: string, queryTerm: string): Promise<any> {
  const res = await fetch(`${URL}/graphql`, getQuery(params, queryTerm));
  return res.json();
}

async function getGraphQLOutput(
  params: string,
  queryTerm: string
): Promise<any> {
  try {
    const res = await fetch(`${URL}/graphql`, getQuery(params, queryTerm));
    const { data } = await res.json();
    // fetchPosts(params, queryTerm);
    return {
      props: data,
      fallback: false,
    };
  } catch (error) {
    console.error(error);
  }
}
export { fetchPosts, getGraphQLOutput };
