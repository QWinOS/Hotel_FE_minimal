"use client";
// import { use, useEffect, useRef, useState } from "react";
import { getGraphQLOutput, fetchPosts } from "./GraphQL";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
// import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

// import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./ui/Date_Picker_Old";
import { signIn } from "@/auth";
import { SignIn } from "./sign_in_button";
// import {SignInButton} from "./sign_in_button";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Individual_Room_Slider } from "./slider";
import { useState } from "react";
// import { error } from "console";
import { Button } from "@/components/ui/button";
import ContactForm from "./contact_form";
import { WhatsAppForm } from "./WhatsAppForm";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

const Individual_Room = (res: any) => {
  // const [data1, setData1] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async (data1: string) => {
  //     try {
  //       const res = await getGraphQLOutput("getRoomByDocId", data1);
  //       // if (!res.ok) {
  //       //   throw new Error(`HTTP error! status: ${res.status}`);
  //       // }
  //       console.log(res.props.room);
  //       setData1(res.props);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching room data:", error);
  //       setLoading(false);
  //     }
  //   };
  //   // const data1 = data;
  //   fetchData(data);
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data1.room) return <p>No rooms to show</p>;

  // const response = use(getGraphQLOutput("getRoomByDocId", data));
  console.log({ res });
  return (
    <>
      <div className="">
        <p className="text-2xl sm:text-3xl font-medium font-stretch-extra-expanded tracking-wide text-center">
          {res.data.props.room.Room_Type}
        </p>
      </div>
      <div className="max-w-6xl mx-auto relative">
        <Individual_Room_Slider props={res.data.props} />
      </div>
      {/* {data1.room.Room_Type} */}
      <div className="flex justify-center flex-col items-center sm:items-baseline sm:flex-row md:flex-row lg:flex-row xl:flex-row mt-5 mb-5">
        <div className="flex justify-center">
          <div
            className="prose max-w-xs text-[#4B3221]
        sm:prose-sm
        md:prose-sm
        lg:prose-xl xl:prose-xl dark:text-[#D6D6D8]
        sm:max-w-sm 
        md:max-w-lg 
        lg:max-w-3xl
        xl:max-w-4xl"
          >
            {/* <div className="flex justify-center"> */}
            <BlocksRenderer
              content={res.data.props.room.Description}
              blocks={{
                heading: ({ children, level }) => {
                  switch (level) {
                    case 1:
                      return <p className="text-2xl">{children}</p>;
                    case 2:
                      return <p className="text-xl">{children}</p>;
                    case 3:
                      return <p className="text-lg">{children}</p>;
                    default:
                      return <p className="text-lg">{children}</p>;
                  }
                },
                list: ({ children, format }) => (
                  <ul className={`list-disc }`}>{children}</ul>
                ),
              }}
            />
          </div>
        </div>
        <div className="sm:ml-10">
          {/* <DatePickerWithRange /> */}
          {/* <ContactForm /> */}
          <WhatsAppForm />
        </div>
      </div>
      {/* <Button type="submit">Submit</Button> */}
      <div>{/* <SignIn /> */}</div>
    </>
  );
};
export default Individual_Room;
