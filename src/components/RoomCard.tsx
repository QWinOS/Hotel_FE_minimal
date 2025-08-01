import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

export default function RoomCard({ room }: { room: any }) {
  const { Room_Type, Description, Price, Room_Images, documentId } = room;
  const imageUrl = Room_Images?.[0]?.url
    ? `${URL}${Room_Images[0].url}`
    : "/placeholder.svg";
  const descriptionText =
    Description?.[0]?.children?.[0]?.text || "No description available.";

  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
      <Link href={`/room/${documentId}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Room</span>
      </Link>
      <div className="relative h-60 w-full">
        <Image
          src={imageUrl}
          alt={Room_Type || "Room Image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">{Room_Type}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {descriptionText}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">
            &#8377;{Price}
            <span className="text-sm font-normal text-slate-600">/night</span>
          </p>
          <Button size="sm" asChild>
            <Link href={`/room/${documentId}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
