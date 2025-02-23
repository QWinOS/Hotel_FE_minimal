"use client";
import { Keyboard, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { use, useEffect } from "react";
import getGraphQLOutput from "./GraphQL";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;
const Slider = (rooms: any) => {
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      slidesPerGroupSkip={1}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        769: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      }}
      scrollbar={false}
      navigation={true}
      pagination={{
        // clickable: true,
        dynamicBullets: true,
      }}
      modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      spaceBetween={30}
      className="mySwiper"
    >
      {Object.keys(rooms.props).map((room: unknown, id: number) => {
        let room_Type = rooms.props[id].Room_Type;
        let description = rooms.props[id].Description[0].children[0].text;
        let room_img = rooms.props[id].Room_Images[0].url;
        let price = rooms.props[id].Price;

        room_img = URL + room_img;
        // console.log(rooms.props[id] + " " + id);
        return (
          <SwiperSlide key={id}>
            <div className="flex flex-col" key={id}>
              <div
                style={{
                  position: "relative",
                  // height: "300px",
                  width: "100%",
                  aspectRatio: "4/3",
                }}
                // className="mx-5"
              >
                <Image
                  src={room_img}
                  fill
                  alt={room_Type}
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="border-x border-b border-gray-300 ">
                <div className="m-2">
                  <div className="font-medium line-clamp-1">
                    <p className="">{room_Type}</p>
                  </div>
                  <div className="font-bold">
                    <p>From &#8377;{price} per night</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
const SliderMobile = (rooms: any) => {
  return (
    <Swiper
      slidesPerView={1}
      // centeredSlides={true}
      // slidesPerGroupSkip={1}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        769: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
      scrollbar={false}
      navigation={true}
      pagination={{
        clickable: false,
      }}
      modules={[Keyboard, Scrollbar, Navigation]}
      spaceBetween={5}
      className="mySwiper"
    >
      {Object.keys(rooms.props).map((room: unknown, id: number) => {
        let room_Type = rooms.props[id].Room_Type;
        let description = rooms.props[id].Description[0].children[0].text;
        let room_img = rooms.props[id].Room_Images[0].url;
        let price = rooms.props[id].Price;

        room_img = URL + room_img;
        // console.log(rooms.props[id] + " " + id);
        return (
          <SwiperSlide key={id}>
            <div className="flex flex-col" key={id}>
              <div
                style={{
                  position: "relative",
                  // height: "300px",
                  width: "100%",
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src={room_img}
                  fill
                  alt={room_Type}
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-t-xl"
                />
              </div>
              <div className=" flex border border-gray-300 rounded-b-xl justify-center">
                <div className="flex flex-col mt-3 mb-3">
                  <div className="font-medium line-clamp-1">
                    <p className="">{room_Type}</p>
                  </div>
                  <div className="font-bold text-center">
                    <p>From &#8377;{price} per night</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export { Slider, SliderMobile };
