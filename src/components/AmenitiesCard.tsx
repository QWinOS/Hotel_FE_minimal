import Image from "next/image";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

export default function AmenitiesCard({ amenity }: { amenity: any }) {
  const { Title, Description, Thumbnail } = amenity;
  const thumbnailUrl = Thumbnail?.url
    ? `${URL}${Thumbnail.url}`
    : "/placeholder.svg";

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={thumbnailUrl}
          alt={Title || "Amenity Icon"}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{Title}</h3>
        <p className="text-sm text-slate-600">{Description}</p>
      </div>
    </div>
  );
}
