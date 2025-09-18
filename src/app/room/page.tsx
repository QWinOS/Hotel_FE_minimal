import { getGraphQLOutput } from "@/components/GraphQL";
import { Load } from "@/components/Framer";
import RoomCard from "@/components/RoomCard";

export default async function RoomsPage() {
  const { props: data, error } = await getGraphQLOutput("all_rooms", "");

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const rooms = data?.rooms || [];

  return (
    <div className="bg-[#F8FAFC]">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#009688] sm:text-5xl md:text-6xl">
            Our Rooms
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Explore our collection of beautifully designed rooms, each offering
            a unique blend of comfort and style.
          </p>
          <div className="mt-6 h-1 w-24 bg-amber-500 mx-auto rounded-full" />
        </div>

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room: any, i: number) => (
              <Load key={room.documentId} index={i}>
                <RoomCard room={room} />
              </Load>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600">
              No rooms available at the moment. Please check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
