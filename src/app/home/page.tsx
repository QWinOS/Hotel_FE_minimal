import { getGraphQLOutput } from "@/components/GraphQL";
import Image from "next/image";
import AmenitiesCard from "@/components/AmenitiesCard";
import FeaturedRooms from "@/components/FeaturedRooms";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_HOST = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const STRAPI_API_PORT = process.env.NEXT_PUBLIC_STRAPI_API_PORT;

// Determine the base URL for API requests
const BASE_API_URL = STRAPI_API_URL || `${STRAPI_API_HOST}:${STRAPI_API_PORT}`;

export default async function HomePage() {
  const { props: bannerData, error: bannerError } = await getGraphQLOutput(
    "banner",
    ""
  );
  const { props: roomData, error: roomError } = await getGraphQLOutput(
    "featured_room",
    ""
  );
  const { props: amenityData, error: amenityError } = await getGraphQLOutput(
    "amenitie",
    ""
  );

  if (bannerError || roomError || amenityError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Failed to fetch page data. Please try again later.</p>
      </div>
    );
  }

  const {
    Description: description,
    Left_Aligned_Text: leader,
    Pics,
  } = bannerData?.banner || {};
  const imgURL = Pics?.[0]?.url;
  const rooms = roomData?.rooms || [];
  const amenities = amenityData?.amenities || [];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {leader}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              {description}
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/room">Explore Rooms</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 w-full rounded-lg shadow-xl overflow-hidden">
            <Image
              src={imgURL}
              alt="Hotel Banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Rooms
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Experience comfort and style in our thoughtfully designed rooms.
            </p>
          </div>
          <FeaturedRooms rooms={rooms} />
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our Amenities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Discover the features that make our hotel a premier destination.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity: any) => (
              <AmenitiesCard key={amenity.Title} amenity={amenity} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
