"use client";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import { Individual_Room_Slider } from "./slider";
import { WhatsAppForm } from "./WhatsAppForm";

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

  return (
    <div
      className="relative min-h-screen py-8 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-40 font-sans bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200"
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
        className="relative z-10 max-w-6xl mx-auto mb-10 p-6 sm:p-10 md:p-14 lg:p-20 rounded-3xl shadow-xl bg-white/80 backdrop-blur-2xl border border-slate-200/50"
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
          <div className="room-slider-img w-full max-w-2xl md:max-w-3xl min-h-[220px] md:min-h-[340px] bg-slate-100 border border-slate-200 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]">
            <div className="w-full h-full flex items-center justify-center">
              <Individual_Room_Slider props={res.data.props.room.Room_Images} />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-12 mt-8"
          style={{ overflow: "visible" }}
        >
          <div
            className="prose w-full max-w-lg text-[#023047] dark:text-[#D6D6D8] bg-white/95 rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-slate-200 transition-shadow duration-300 hover:shadow-xl"
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
              className="bg-gradient-to-br from-[#219EBC] to-[#8ECAE6] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20 flex flex-col items-center backdrop-blur-xl w-full"
              style={{
                overflow: "visible",
                boxShadow: "0 8px 32px 0 rgba(2, 48, 71, 0.14)",
              }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 tracking-wide font-serif text-center drop-shadow-lg">
                Contact & Book Instantly
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
