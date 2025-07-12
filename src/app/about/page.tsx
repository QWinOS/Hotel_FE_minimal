import { getGraphQLOutput } from "@/components/GraphQL";
import {
  About_Our_Team_Slider,
  Individual_Room_Slider,
} from "@/components/slider";
import Image from "next/image";
import { use } from "react";

interface CenterImage {
  url: string;
}

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
export default function About() {
  const about = use(getGraphQLOutput("about", "")).props?.about;
  console.log(about);

  return (
    <>
      <div className="flex flex-col items-center sm:mx-10 md:mx-40">
        {/* Title_Background for Desktop View */}
        <div
          className="hidden sm:flex "
          style={{ position: "relative", width: "90%", height: "300px" }}
        >
          <Image
            src={URL + about?.Title_Background?.url}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            alt="About Us"
            className="rounded-lg mb-5"
          />
          {/* <Image
        alt="Mountains"
        src={URL + about?.Title_Background?.url}
        width={700}
        height={475}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      /> */}
          <p className="absolute bottom-0 w-full flex p-5 backdrop-blur-xl bg-white/30 text-3xl text-shadow-black font-bold text-white ">
            {about?.About_Title}
          </p>
        </div>
        {/* Mobile View for Title_Background */}
        <div className="sm:hidden relative w-full">
          <Image
            src={URL + about?.Title_Background?.url}
            width={700}
            height={475}
            sizes="100vw"
            alt="About Us"
            className=" "
          />
          <p className="absolute bottom-0 w-full flex justify-center  backdrop-blur-xl bg-white/30 text-3xl text-shadow-black font-bold text-white text-center ">
            {about?.About_Title}
          </p>
        </div>
        {/* Our Story */}
        <div className="flex flex-col mt-5 items-center sm:items-baseline md:mx-20">
          <p className="text-3xl font-bold mb-5">{about?.Our_Story_Title}</p>
          <p className="text-lg mb-5 text-justify mx-5 sm:mx-10">
            {about?.Our_Story}
          </p>
        </div>
      </div>
      {/* Center Image */}
      {/* <div className="max-w-6xl mx-auto relative"> */}
      <div className="sm:mx-60 max-w-6xl relative">
        <Individual_Room_Slider props={about?.Center_Images} />
      </div>
      {/* Second_Paragraph */}
      <div className="flex flex-col mt-5 items-center sm:items-baseline md:mx-60">
        <p className="text-3xl font-bold mb-5">
          {about?.Second_Paragraph_Title}
        </p>
        <p className="text-lg mb-5 text-justify mx-5 sm:mx-10">
          {about?.Second_Paragraph_Body}
        </p>
      </div>
      {/* Meet Our Team */}
      <div className="flex flex-col mt-5 items-center sm:items-baseline md:mx-20">
        <p className="text-3xl font-bold mb-5 sm:ml-50">
          {about?.Meet_Our_Team_Title}
        </p>
        <About_Our_Team_Slider props={about?.Meet_Our_Team_Pictures} />
      </div>
    </>
  );
}
