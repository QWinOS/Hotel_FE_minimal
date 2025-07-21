"use client";
// import { use, useEffect, useRef, useState } from "react";
import { getGraphQLOutput } from "./GraphQL";
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
import { signIn } from "@/auth";
import { SignIn } from "./sign_in_button";
// import {SignInButton} from "./sign_in_button";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Individual_Room_Slider } from "./slider";
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
  // console.log({ res });
  return (
    <div
      className="bg-gradient-to-br from-[#e9eafc] via-[#f5f7fa] to-[#c3cfe2] min-h-screen py-8 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-40 relative font-sans"
      style={{ overflow: "visible" }}
    >
      {/* Subtle geometric SVG background for a professional touch */}
      <svg
        className="absolute top-0 left-0 w-full h-32 md:h-40 opacity-10 pointer-events-none z-0"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#4B3221"
          fillOpacity="0.08"
          d="M0,160L80,165.3C160,171,320,181,480,165.3C640,149,800,107,960,117.3C1120,128,1280,192,1360,224L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <div
        className="relative z-10 max-w-6xl mx-auto mb-10 p-4 sm:p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-2xl border border-[#e3e7ed]"
        style={{
          overflow: "visible",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.14)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[#232946] mb-2 leading-tight drop-shadow-sm font-serif">
          {res.data.props.room.Room_Type}
        </h1>
        <div className="flex justify-center mb-8">
          <span className="inline-block w-20 sm:w-28 h-1 rounded-full bg-gradient-to-r from-[#4B3221] via-[#a3aed6] to-[#c3cfe2] animate-pulse"></span>
        </div>
        {/* Responsive, visually balanced slider container - ensure image always visible and no stacking */}
        <div className="w-full flex justify-center mb-10">
          <div className="room-slider-img w-full max-w-2xl md:max-w-3xl min-h-[220px] md:min-h-[340px] bg-black border border-[#bfc8e6] rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]">
            <div className="w-full h-full flex items-center justify-center">
              <Individual_Room_Slider props={res.data.props.room.Room_Images} />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-14 mt-8"
          style={{ overflow: "visible" }}
        >
          <div
            className="prose w-full max-w-lg text-[#232946] dark:text-[#D6D6D8] bg-white/95 rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-[#e3e7ed] transition-shadow duration-300 hover:shadow-2xl"
            style={{ overflow: "visible" }}
          >
            <BlocksRenderer
              content={res.data.props.room.Description}
              blocks={{
                heading: ({ children, level }) => {
                  switch (level) {
                    case 1:
                      return (
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[#4B3221] font-serif tracking-tight">
                          {children}
                        </h2>
                      );
                    case 2:
                      return (
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#4B3221] font-serif">
                          {children}
                        </h3>
                      );
                    case 3:
                      return (
                        <h4 className="text-base sm:text-lg font-medium mb-2 text-[#4B3221] font-serif">
                          {children}
                        </h4>
                      );
                    default:
                      return (
                        <p className="text-base mb-2 text-[#232946]">
                          {children}
                        </p>
                      );
                  }
                },
                list: ({ children, format }) => (
                  <ul className="list-disc pl-6 mb-2">{children}</ul>
                ),
              }}
            />
          </div>
          <div
            className="w-full max-w-xl flex-shrink-0 mb-4 md:mb-0 px-1 sm:px-0"
            style={{ overflow: "visible" }}
          >
            <div
              className="bg-gradient-to-br from-[#f8fafc] to-[#e3e7ed] rounded-2xl p-2 sm:p-7 md:p-10 shadow-2xl border border-[#d1d5db] flex flex-col items-center backdrop-blur-xl w-full"
              style={{
                overflow: "visible",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.14)",
              }}
            >
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#232946] mb-2 sm:mb-6 tracking-wide font-serif text-center">
                Contact &amp; Book Instantly
              </h3>
              <WhatsAppForm />
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-24" />
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default Individual_Room;
