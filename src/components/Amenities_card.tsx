import Image from "next/image";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
const Amenities = async (amenities: any) => {
  console.log(amenities);
  let title = amenities.props.Title;
  let description = amenities.props.Description;
  let thumbnail_img = amenities.props.Thumbnail.url;
  thumbnail_img = URL + thumbnail_img;
  return (
    <>
      <div className="flex flex-row items-center">
        <div
          className="m-2"
          style={{ position: "relative", height: "50px", width: "50px" }}
        >
          <Image
            src={thumbnail_img}
            fill
            alt={title}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-col m-5">
          <div className="font-bold">{title}</div>
          <div className="">{description}</div>
        </div>
      </div>
    </>
  );
};
export default Amenities;
