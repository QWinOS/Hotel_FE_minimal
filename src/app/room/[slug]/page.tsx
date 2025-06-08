import { getGraphQLOutput } from "@/components/GraphQL";
import Individual_Room from "@/components/Room";
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = false; // or false, to 404 on unknown paths
// useEffect(() => {
//   const fetchData = async () => {
//     const data = await getGraphQLOutput("roomsDocId", "");
//     console.log(data);
//   };
//   fetchData();
// }, []);

// This also gets called at build time
export async function generateStaticParams() {
  const character: any = await getGraphQLOutput("roomsDocId", "");
  // console.log(character);
  // character.props.rooms.map(
  //   (docId: any, index: number) => console.log(docId?.documentId)
  //   // slug: { documentId: docId?.docId },
  // );
  return character.props.rooms.map((docId: any, index: number) => ({
    slug: docId?.documentId,
  }));
}
// export function generateStaticParams() {
//   return rooms.data.rooms.map((room) => ({
//     slug: room.documentId,
//   }));
// }
// slug may be a keyword for documentId
// export async function getServerSideProps(context: string) {
//   // const [data1, setData1] = useState(null);
//   // Fetch data from external API
//   console.log(context);
//   const res = await getGraphQLOutput("getRoomByDocId", context);
//   console.log({ res });
//   // Pass data to the page via props
//   return { props: { res } };
// }
export default async function Room({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const res = await getGraphQLOutput("getRoomByDocId", slug);
  // console.log(res);
  return (
    <>
      <Individual_Room data={res} />
    </>
  );
}
