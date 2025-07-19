import { headers } from "next/headers";

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
    case "about":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
              about {
                About_Title
                Title_Background {
                  url
                  alternativeText
                  caption
                }
                Our_Story_Title
                Our_Story
                Center_Images {
                  url
                  caption
                  alternativeText
                }
                Second_Paragraph_Title
                Second_Paragraph_Body
                Meet_Our_Team_Title
                Meet_Our_Team_Pictures {
                  url
                  caption
                  alternativeText
                }
              }
          }`,
        }),
      };
    case "gallery_meta":
      return {
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
            }
          }
          `,
        }),
      };
    case "galleries_connection":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
           {
            galleries_connection(
              pagination: { page: ${queryTerm}, pageSize: 8 }
              sort: "updatedAt"
            ) {
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
    case "employee":
      // Only add Authorization header if the token is defined
      const empToken = process.env.Emp_Read_only;
      return {
        method: "POST",
        headers: empToken
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${empToken}`,
            }
          : {
              "Content-Type": "application/json",
            },
        body: JSON.stringify({
          query: `{
                emps {
                  Basic_Details {
                    employee_info {
                      Name
                      Phone_No
                      Email
                      Designation
                    }
                  }
                  Advance_Taken {
                    Advance_Taken_Month
                    Advance_Taken_Date
                    Advance_Amount
                  }
                  Salary {
                    Salary_Month
                    Salary_Date
                    Salary_Amount
                  }
                  Leaves {
                    leaves_taken
                  }
                }
              }`,
        }),
      };
    case "contact":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          {
            contact {
              Description
              Email
              Map_URL
              Phone
              Address
            }
          }
        `,
        }),
      };
    default:
      return {};
  }
};

// async function fetchPosts(params: string, queryTerm: string): Promise<any> {
//   const res = await fetch(`${URL}/graphql`, getQuery(params, queryTerm));
//   return res.json();
// }

async function getGraphQLOutput(
  params: string,
  queryTerm: string
): Promise<any> {
  try {
    // Remove 'next' and ensure 'cache' is a valid RequestCache value or omit it if not needed
    const rawOptions = getQuery(params, queryTerm);
    // Remove 'next' property if present
    const { next, ...fetchOptions } = rawOptions as any;
    // Only include 'cache' if it's a valid RequestCache value
    if (
      fetchOptions.cache &&
      ![
        "default",
        "no-store",
        "reload",
        "no-cache",
        "force-cache",
        "only-if-cached",
      ].includes(fetchOptions.cache)
    ) {
      delete fetchOptions.cache;
    }
    const res = await fetch(`${URL}/graphql`, fetchOptions);
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
export { getGraphQLOutput };
