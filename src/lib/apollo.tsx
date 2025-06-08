// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
// const URL = host + ":" + port;

// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache({ addTypename: false }),
//     link: new HttpLink({
//       uri: URL + "/graphql",
//     }),
//   });
// });

// const client = new ApolloClient({
//   uri: URL + "/api/graphql",
//   cache: new InMemoryCache(),
// });

// export default client;
// import { Client, cacheExchange, createClient, fetchExchange } from "urql";

// const client = new Client({
//   url: URL + "/graphql",
//   exchanges: [cacheExchange, fetchExchange],
// });
// const url = URL + "/graphql";
// export const client2 = createClient(client);
