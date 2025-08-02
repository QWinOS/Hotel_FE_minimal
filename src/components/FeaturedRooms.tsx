"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import RoomCard from "./RoomCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedRooms({ rooms }: { rooms: any[] }) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{ prevEl, nextEl }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.documentId}>
            <RoomCard room={room} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={(node) => setPrevEl(node)}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-all duration-300 md:opacity-0 group-hover:opacity-100 hover:bg-slate-100 disabled:opacity-0 md:-left-4"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-slate-800" />
      </button>
      <button
        ref={(node) => setNextEl(node)}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-all duration-300 md:opacity-0 group-hover:opacity-100 hover:bg-slate-100 disabled:opacity-0 md:-right-4"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-slate-800" />
      </button>
    </div>
  );
}
