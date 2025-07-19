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
    <>
      {/* Top Banner */}
      <div className="flex-row justify-around items-center hidden sm:flex mb-5 ">
        <div className="flex-col justify-around">
          <div className="font-bold text-2xl">{leader}</div>
          <div className="text-xl">{description}</div>
        </div>
        <Image
          src={imgURL}
          height={500}
          width={500}
          alt="Hotel"
          className="m-5"
        />
      </div>
      {/* Top Banner Mobile */}
      <div className="flex flex-col sm:hidden m-10">
        <Image
          src={imgURL}
          height={500}
          width={500}
          alt="Hotel"
          className="rounded-lg"
        />
        <div className="flex flex-col justify-around items-center mt-5">
          <div className="font-bold text-2xl">{leader}</div>
          <div className="text-xl">{description}</div>
        </div>
      </div>
      {/* Featured Rooms */}
      <div className="hidden sm:flex flex-col">
        <div className="flex justify-center font-bold text-2xl">
          Featured Rooms
        </div>
        {/* <div className="flex flex-row justify-around">
          {Object.values(rooms).map((room: any, id: number) => {
            console.log(room + " " + id);
            return <Room_card props={room} key={id} />;
          })}
        </div> */}
        <div className="flex flex-row justify-around m-5">
          <Slider className="m-20" props={rooms} />
        </div>
      </div>
      {/* Featured Rooms Mobile */}
      <div className="flex sm:hidden flex-col">
        <div className="flex justify-center font-bold text-2xl">
          Featured Rooms
        </div>
        {/* <div className="flex flex-row justify-around">
          {Object.values(rooms).map((room: any, id: number) => {
            console.log(room + " " + id);
            return <Room_card props={room} key={id} />;
          })}
        </div> */}
        <div className="flex flex-row justify-around m-5">
          <SliderMobile props={rooms} />
        </div>
      </div>
      {/* Hotel Amenities */}
      <div className="hidden sm:flex flex-row justify-center">
        <div className="flex flex-col justify-center m-5">
          <p className="font-bold text-2xl">
            Why Choose Hotel Sweet Home International ?
          </p>
          <p className="text-lg">
            Discover the unique features that make our hotels stand out.
          </p>
        </div>
        <div className="grid justify-center">
          {/* <div>Hotel Amenities</div> */}
          <div className="grid grid-cols-2 gap-4 justify-around">
            {Object.values(amenities).map((amenitie: any, id: number) => {
              // console.log(amenitie);
              return <Amenities props={amenitie} key={id} />;
            })}
          </div>
        </div>
      </div>
      {/* Hotel Amenities Mobile */}
      <div className="sm:hidden flex flex-col">
        <div className="flex flex-col justify-center m-5">
          <p className="font-bold text-2xl">
            Why Choose Hotel Sweet Home International ?
          </p>
          <p className="text-lg">
            Discover the unique features that make our hotels stand out.
          </p>
        </div>
        <div className="grid m-5 justify-center">
          {/* <div>Hotel Amenities</div> */}
          <div className="grid grid-cols-2 gap-4 justify-around">
            {Object.values(amenities).map((amenitie: any, id: number) => {
              // console.log(amenitie);
              return <AmenitiesMobile props={amenitie} key={id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
