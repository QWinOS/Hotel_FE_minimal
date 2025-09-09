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

const Individual_Room = ({ data }: { data: any }) => {
  const room = data?.props?.room;

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Room data not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#009688] sm:text-5xl md:text-6xl">
            {room.Room_Type}
          </h1>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#FB8500] via-[#FFB703] to-[#219EBC] mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Image Slider */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <Individual_Room_Slider props={room.Room_Images} />
            </div>
          </div>

          {/* Right Column: Description and Booking */}
          <div className="lg:col-span-2">
            <div className="space-y-10">
              {/* Description Section */}
              <div className="prose max-w-none text-slate-600">
                <BlocksRenderer content={room.Description} />
              </div>

              {/* Booking Section */}
              <div className="rounded-lg bg-white p-8 shadow-lg border">
                <h2 className="text-2xl font-bold text-[#009688] mb-6 text-center">
                  Book Your Stay
                </h2>
                <WhatsAppForm roomType={room.Room_Type} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Individual_Room;
