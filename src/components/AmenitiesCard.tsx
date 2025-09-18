import Image from "next/image";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;

export default function AmenitiesCard({ amenity }: { amenity: any }) {
  const { Title, Description, Thumbnail } = amenity;
  const thumbnailUrl = Thumbnail?.url;
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
        <h3 className="text-lg font-semibold text-[#009688]">{Title}</h3>
        <p className="text-sm text-slate-600">{Description}</p>
      </div>
    </div>
  );
}
