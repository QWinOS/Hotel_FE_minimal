import { getGraphQLOutput } from "@/components/GraphQL";
import Individual_Room from "@/components/Room";

export async function generateStaticParams() {
  const { props: data, error } = await getGraphQLOutput("roomsDocId", "");
  if (error || !data?.rooms) {
    return [];
  }
  return data.rooms.map((room: any) => ({
    slug: room.documentId,
  }));
}

export default async function RoomPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getGraphQLOutput("getRoomByDocId", slug);

  return <Individual_Room data={data} />;
}
