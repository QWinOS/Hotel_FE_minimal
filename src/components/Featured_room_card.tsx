import Image from "next/image";
const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
const Room_card = async (room: any) => {
  let room_Type = room.props.Room_Type;
  let description = room.props.Description[0].children[0].text;
  let room_img = room.props.Room_Images[0].url;
  let price = room.props.Price;

  room_img = URL + room_img;
  return (
    <>
      <div className="flex flex-col">
        <div style={{ position: "relative", height: "200px", width: "200px" }}>
          <Image
            src={room_img}
            fill
            alt={room_Type}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="border-x border-b border-gray-300 ">
          <div className="m-2">
            <div className="font-medium">{room_Type}</div>
            {/* <div>{description}</div> */}
            <div className="font-bold">From &#8377;{price} per night</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Room_card;
