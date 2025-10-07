import { getGraphQLOutput } from "@/components/GraphQL";
import HeroImage from "@/components/HeroImage";
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
    Line1: leader,
    Line2: subLeader,
    Line3: subSubLeader,
    Description: description,
    Pics,
  } = bannerData?.banner || {};
  const imgURL = Pics?.[0]?.url || "/default-banner.jpg";
  // const imgURL = BASE_API_URL + Pics?.[0]?.url;

  const rooms = roomData?.rooms || [];
  const amenities = amenityData?.amenities || [];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <HeroImage imgURL={imgURL} />
        <div className="absolute inset-0 bg-amber-50/10" />
        <div className="relative z-10 p-4 max-w-8xl mx-auto text-white">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-6xl leading-tight drop-shadow-2xl text-white">
            <span className="text-white">{leader}</span>
            <br />
            <span className="text-[#FF9800] text-5xl sm:text-6xl">
              {subLeader}
            </span>
            <br />
            <div className="mt-6 h-1 bg-gradient-to-r from-[#FB8500] via-[#FFB703] to-[#219EBC] mx-auto rounded-full w-3/4 sm:w-3xl" />
            <span className="text-white text-3xl sm:text-5xl">
              {subSubLeader}
            </span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl font-light leading-relaxed drop-shadow-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-8 py-3 text-lg bg-[#009688] text-white hover:bg-[#236060] transition-colors duration-300 shadow-lg font-semibold"
            >
              <Link href="/room">Explore Rooms</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-[#FF9800] text-[#FF9800] hover:bg-[#FF9800] hover:text-white transition-colors duration-300 shadow-lg"
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#009688] sm:text-4xl">
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
            <h2 className="text-3xl font-bold tracking-tight text-[#009688] sm:text-4xl">
              Our Amenities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Enjoy comfort, convenience and care with every stay.
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
