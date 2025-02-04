import getGraphQLOutput from "@/components/GraphQL";
import Image from "next/image";
import { use } from "react";
import Room_card from "@/components/Featured_room_card";
import Amenities from "@/components/Amenities_card";

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
      <div className="flex flex-row justify-around items-center">
        <div className="flex-col justify-around">
          <div className="">{leader}</div>
          <div className="">{description}</div>
        </div>
        <Image src={imgURL} height={500} width={500} alt="Hotel" />
      </div>
      {/* Featured Rooms */}
      <div className="flex flex-col">
        <div>Featured Rooms</div>
        <div className="flex flex-row justify-around">
          {Object.values(rooms).map((room: any, id: number) => {
            console.log(room + " " + id);
            return <Room_card props={room} key={id} />;
          })}
        </div>
      </div>
      {/* Hotel Amenities */}
      <div className="grid justify-center">
        <div>Hotel Amenities</div>
        <div className="grid grid-cols-2 gap-4 justify-around">
          {Object.values(amenities).map((amenitie: any, id: number) => {
            console.log(amenitie);
            return <Amenities props={amenitie} key={id} />;
          })}
        </div>
      </div>
    </>
  );
}
