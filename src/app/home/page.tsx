import { getGraphQLOutput } from "@/components/GraphQL";
import Image from "next/image";
import { use } from "react";
import Room_card from "@/components/Featured_room_card";
import { Amenities, AmenitiesMobile } from "@/components/Amenities_card";
import { Slider, SliderMobile } from "@/components/slider";
import "../../app/globals.css";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

export default function Home2() {
  const banner = use(getGraphQLOutput("banner", ""));
  const description = banner.props.banner.Description;
  const leader = banner.props.banner.Left_Aligned_Text;
  let imgURL = banner.props.banner.Pics[0].url;
  const featured_room = use(getGraphQLOutput("featured_room", ""));
  const rooms = featured_room.props.rooms;
  const hotel_amenities = use(getGraphQLOutput("amenitie", ""));
  const amenities = hotel_amenities.props.amenities;
  // console.log(hotel_amenities);
  imgURL = URL + imgURL;
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#F8FAFC] via-[#E5EDF1] to-[#8ECAE6] pb-10 pt-1 sm:pt-10">
      {/* Top Banner Desktop */}
      <div className="hidden sm:flex items-center justify-between max-w-6xl mx-auto  mb-12 bg-white/95 rounded-3xl shadow-2xl border border-[#219EBC] p-8 gap-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#023047] mb-2 font-serif tracking-tight leading-tight">
            {leader}
          </h1>
          <p className="text-lg md:text-xl text-[#023047] font-medium">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={imgURL}
            height={320}
            width={320}
            alt="Hotel"
            className="rounded-2xl shadow-lg border border-[#8ECAE6] object-cover"
          />
        </div>
      </div>
      {/* Top Banner Mobile */}
      <div className="flex flex-col sm:hidden m-4 mt-8 bg-white/95 rounded-2xl shadow-xl border border-[#219EBC] p-4 items-center">
        <Image
          src={imgURL}
          height={220}
          width={340}
          alt="Hotel"
          className="rounded-xl object-cover shadow-md border border-[#8ECAE6]"
        />
        <div className="flex flex-col justify-around items-center mt-4 gap-2">
          <h1 className="font-extrabold text-2xl text-[#023047] text-center font-serif tracking-tight">
            {leader}
          </h1>
          <p className="text-base text-[#023047] text-center font-medium">
            {description}
          </p>
        </div>
      </div>
      {/* Featured Rooms */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#023047] text-center mb-6 font-serif tracking-tight">
          Featured Rooms
        </h2>
        {/* <div className="flex flex-row justify-around">
          {Object.values(rooms).map((room: any, id: number) => {
            console.log(room + " " + id);
            return <Room_card props={room} key={id} />;
          })}
        </div> */}
        <div className="hidden sm:flex flex-row justify-center">
          <Slider className="w-full" props={rooms} />
        </div>
        <div className="flex sm:hidden flex-row justify-center">
          <SliderMobile props={rooms} />
        </div>
      </div>
      {/* Hotel Amenities */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#023047] text-center mb-6 font-serif tracking-tight">
          Why Choose Hotel Sweet Home International?
        </h2>
        <p className="text-lg text-[#023047] text-center mb-8">
          Discover the unique features that make our hotels stand out.
        </p>
        {/* <div>Hotel Amenities</div> */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {Object.values(amenities).map((amenitie: any, id: number) => (
            <Amenities props={amenitie} key={id} />
          ))}
        </div>
        <div className="sm:hidden grid grid-cols-2 gap-4 justify-center">
          {Object.values(amenities).map((amenitie: any, id: number) => (
            <AmenitiesMobile props={amenitie} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
}
