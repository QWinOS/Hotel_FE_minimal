import { headers } from "next/headers";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;

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
                            Line1
                            Line2
                            Line3
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
    case "all_rooms":
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
                Testimonials_Title
                Testimonial {
                  Author_Name
                  Content
                  Rating
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
    // Remove 'next' property if present, as it conflicts with 'revalidate' at the top level
    const { next, cache, ...restOfFetchOptions } = rawOptions as any;

    // Default revalidate to 60 seconds (1 minute) for fresh content,
    // or use a custom cache value if explicitly provided and valid.
    const fetchOptions: RequestInit = {
      ...restOfFetchOptions,
      next: { revalidate: 60 }, // Default revalidation time
    };

    // If a specific cache strategy was set (e.g., no-store), apply it.
    // However, 'revalidate' takes precedence over 'cache' property for ISR.
    if (cache) {
      if (
        [
          "default",
          "no-store",
          "reload",
          "no-cache",
          "force-cache",
          "only-if-cached",
        ].includes(cache)
      ) {
        // If cache is "no-store", we still want to apply the revalidate for ISR.
        // For other cache values, Next.js 'revalidate' config in 'next' property is usually preferred.
        // We'll keep the default revalidate behavior and let it be overridden by tags if used.
        // For 'no-store', we'd typically not want revalidate, but that defeats the purpose of ISR here.
        // So, 'no-store' should really be handled by omitting 'revalidate' or setting it to 0.
        // For this task, a blanket revalidate helps ensure freshness after inactivity.
        if (cache === "no-store") {
          fetchOptions.cache = "no-store"; // For cases where immediate no-cache is desired for specific queries
        }
      }
    }

    const res = await fetch(`${BASE_API_URL}/graphql`, fetchOptions);
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
