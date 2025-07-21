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
import { useRef, useEffect } from "react";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

const Individual_Room = (res: any) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    // Set initial position to center
    bg.style.setProperty("--blob-x", "50%");
    bg.style.setProperty("--blob-y", "50%");
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      bg.style.setProperty("--blob-x", `${x * 100}%`);
      bg.style.setProperty("--blob-y", `${y * 100}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      className="relative min-h-screen py-8 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-40 font-sans bg-gradient-to-br from-[#F8FAFC] via-[#E5EDF1] to-[#8ECAE6]"
      style={{ overflow: "visible" }}
    >
      {/* Interactive blurred color blobs for a modern, professional background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={
          {
            "--blob-x": "50%",
            "--blob-y": "50%",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#219EBC] opacity-20 rounded-full blur-3xl"
          style={{
            left: "calc(var(--blob-x, 50%) * 0.15)",
            top: "calc(var(--blob-y, 50%) * 0.10)",
            transition:
              "left 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#FB8500] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            left: "calc(50% + (var(--blob-x, 50%) - 50%) * -0.08)",
            top: "calc(50% + (var(--blob-y, 50%) - 50%) * 0.12)",
            transition:
              "left 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-[#023047] opacity-10 rounded-full blur-2xl"
          style={{
            right: "calc((100% - var(--blob-x, 50%)) * 0.12)",
            bottom: "calc((100% - var(--blob-y, 50%)) * 0.10)",
            transition:
              "right 0.3s cubic-bezier(.4,2,.6,1), bottom 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-60 h-60 bg-[#FFB703] opacity-10 rounded-full blur-2xl"
          style={{
            right: "calc(33% - (var(--blob-x, 50%) * 0.10))",
            top: "calc(var(--blob-y, 50%) * -0.08)",
            transition:
              "right 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        />
      </div>
      <div
        className="relative z-10 max-w-6xl mx-auto mb-10 p-4 sm:p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-2xl border border-[color:var(--color-border)]"
        style={{
          overflow: "visible",
          boxShadow: "0 8px 32px 0 rgba(2, 48, 71, 0.14)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[#023047] mb-2 leading-tight drop-shadow-sm font-serif">
          {res.data.props.room.Room_Type}
        </h1>
        <div className="flex justify-center mb-8">
          <span className="inline-block w-20 sm:w-28 h-1 rounded-full bg-gradient-to-r from-[#FB8500] via-[#FFB703] to-[#219EBC] animate-pulse"></span>
        </div>
        {/* Responsive, visually balanced slider container - ensure image always visible and no stacking */}
        <div className="w-full flex justify-center mb-10">
          <div className="room-slider-img w-full max-w-2xl md:max-w-3xl min-h-[220px] md:min-h-[340px] bg-[#023047] border border-[#219EBC] rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]">
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
            className="prose w-full max-w-lg text-[#023047] dark:text-[#D6D6D8] bg-white/95 rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-[#219EBC] transition-shadow duration-300 hover:shadow-2xl"
            style={{ overflow: "visible" }}
          >
            <BlocksRenderer
              content={res.data.props.room.Description}
              blocks={{
                heading: ({ children, level }) => {
                  switch (level) {
                    case 1:
                      return (
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[#FB8500] font-serif tracking-tight">
                          {children}
                        </h2>
                      );
                    case 2:
                      return (
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#219EBC] font-serif">
                          {children}
                        </h3>
                      );
                    case 3:
                      return (
                        <h4 className="text-base sm:text-lg font-medium mb-2 text-[#023047] font-serif">
                          {children}
                        </h4>
                      );
                    default:
                      return (
                        <p className="text-base mb-2 text-[#023047]">
                          {children}
                        </p>
                      );
                  }
                },
                list: ({ children, format }) => (
                  <ul className="list-disc pl-6 mb-2 text-[#219EBC]">
                    {children}
                  </ul>
                ),
              }}
            />
          </div>
          <div
            className="w-full max-w-xl flex-shrink-0 mb-4 md:mb-0 px-1 sm:px-0"
            style={{ overflow: "visible" }}
          >
            <div
              className="bg-gradient-to-br from-[#FFB703] to-[#FB8500] rounded-2xl p-2 sm:p-7 md:p-10 shadow-2xl border border-[#219EBC] flex flex-col items-center backdrop-blur-xl w-full"
              style={{
                overflow: "visible",
                boxShadow: "0 8px 32px 0 rgba(2, 48, 71, 0.14)",
              }}
            >
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#023047] mb-2 sm:mb-6 tracking-wide font-serif text-center">
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
