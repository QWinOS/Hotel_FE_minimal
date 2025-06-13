"use client";
import {
  Autoplay,
  EffectCreative,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { use, useEffect } from "react";
import { getGraphQLOutput } from "./GraphQL";
import Individual_Room from "./Room";
import Room from "@/app/room/[slug]/page";
import Link from "next/link";

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
      {/* <Swiper
      modules={[Navigation, Pagination, EffectCreative]}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      navigation={{
        nextEl: ".wiper-button-nexst",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
        renderBullet: (index, className) => {
          return `<span class="${className} custom-bullet"></span>`;
        },
      }}
      loop={true}
      speed={600}
      className="expo-swiper"
    > */}
      {Object.keys(rooms.props).map((room: unknown, id: number) => {
        let room_Type = rooms.props[id].Room_Type;
        let description = rooms.props[id].Description[0].children[0].text;
        let room_img = rooms.props[id].Room_Images[0].url;
        let price = rooms.props[id].Price;
        let docId = rooms.props[id].documentId;

        room_img = URL + room_img;
        // console.log(rooms.props[id] + " " + id);
        return (
          <SwiperSlide key={id}>
            <Link
              className="flex flex-col w-full bg-transparent border-none p-0 hover:scale-105 transition-transform"
              href={"/room/" + docId}
            >
              <div className="" key={id}>
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
                <div className="border-x border-b border-gray-300 dark:border-white ">
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
            </Link>
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
        // clickable: false,
        dynamicBullets: true,
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
            <Link
              href={"/room/" + rooms.props[id].documentId}
              className="flex flex-col w-full bg-transparent border-none p-0 hover:scale-105 transition-transform"
              type="button"
              // onClick={() => {
              //   console.log("HIT");
              // }}
            >
              <div className="" key={id}>
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
                <div className=" flex border-2 border-gray-300 dark:border-white rounded-b-xl justify-center">
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
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

interface PhotoSwipeItem {
  src: string;
  w: number;
  h: number;
  title?: string;
  msrc?: string;
  el: Element;
  pid?: number;
}

interface PhotoSwipeOptions {
  galleryUID?: string | number;
  getThumbBoundsFn?: (index: number) => { x: number; y: number; w: number };
  galleryPIDs?: boolean;
  index?: number;
  showAnimationDuration?: number;
}

interface HashParams {
  [key: string]: string | number | undefined;
  gid?: number;
  pid?: string;
}

declare var PhotoSwipe: any;
declare var PhotoSwipeUI_Default: any;

var initPhotoSwipeFromDOM = function (gallerySelector: string): void {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function (el: Element): PhotoSwipeItem[] {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items: PhotoSwipeItem[] = [],
      figureEl: ChildNode,
      linkEl: Element,
      size: string[],
      item: PhotoSwipeItem;

    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = (figureEl as Element).children[0]; // <a> element

      size = linkEl.getAttribute("data-size")!.split("x");

      // create slide object
      item = {
        src: linkEl.getAttribute("href")!,
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
        el: figureEl as Element,
      };

      if ((figureEl as Element).children.length > 1) {
        // <figcaption> content
        item.title = (figureEl as Element).children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src")!;
      }

      item.el = figureEl as Element; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(
    el: Element | null,
    fn: (el: Element) => boolean
  ): Element | null {
    return el && (fn(el) ? el : closest(el.parentElement, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function (e: MouseEvent): boolean | void {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    else (e as any).returnValue = false;

    var eTarget = e.target as Element;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el: Element) {
      return !!el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode as Element,
      childNodes = clickedListItem.parentNode!.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index: number | undefined;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index !== undefined && index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function (): HashParams {
    var hash = window.location.hash.substring(1),
      params: HashParams = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid && typeof params.gid === "string") {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (
    index: number,
    galleryElement: Element,
    disableAnimation?: boolean,
    fromURL?: boolean
  ): void {
    var pswpElement = document.querySelectorAll(".pswp")[0] as Element,
      gallery: any,
      options: PhotoSwipeOptions,
      items: PhotoSwipeItem[];

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute("data-pswp-uid")!,
      getThumbBoundsFn: function (index: number) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid === index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index as any, 10) - 1;
      }
    } else {
      options.index = parseInt(index as any, 10);
    }

    // exit if index not found
    if (isNaN(options.index as number)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", (i + 1).toString());
    (galleryElements[i] as HTMLElement).onclick = onThumbnailsClick as any;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(
      hashData.pid as any,
      galleryElements[hashData.gid - 1],
      true,
      true
    );
  }
};
//  how to integrate
const Individual_Room_Slider = (data: any) => {
  console.log(data);
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCreative, Autoplay]}
      effect="creative"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
          rotate: [0, 0, -15],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
          rotate: [0, 0, 15],
        },
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        renderBullet: (index, className) =>
          `<span class="${className} custom-bullet"></span>`,
      }}
      loop={true}
      speed={600}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 3000, // 3 seconds between slides
        disableOnInteraction: false, // keeps autoplay after user interaction
      }}
      // breakpoints={{
      //   640: {
      //     spaceBetween: 15,
      //   },
      //   480: {
      //     spaceBetween: 10,
      //   },
      // }}
      className="custom-carousel"
    >
      {/* {data.props.room.Room_Images.map((value: any, key: number) => ( */}
      {data.props.map((value: any, key: number) => {
        console.log(key + " -> " + value.url);
        return (
          <SwiperSlide key={key} className="slide-card">
            <div className="relative h-[300px] sm:h-[600px] max-w-full ">
              <Image
                src={URL + value.url} // Your dynamic image URL
                alt={`Slide ${key}`}
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="100vh, 80vw"
                priority={key === 0}
              />
            </div>
          </SwiperSlide>
        );
      })}

      {/* Custom Navigation */}
      <div className="swiper-button-prev custom-nav"></div>
      <div className="swiper-button-next custom-nav"></div>

      {/* Custom Pagination */}
      <div className="swiper-pagination"></div>
    </Swiper>

    // <Swiper
    //   modules={[Navigation, Pagination, EffectCreative, Autoplay]}
    //   effect={"creative"}
    //   creativeEffect={{
    //     prev: {
    //       shadow: true,
    //       translate: ["-20%", 0, -1],
    //     },
    //     next: {
    //       translate: ["100%", 0, 0],
    //     },
    //   }}
    //   navigation={{
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   }}
    //   pagination={{
    //     clickable: true,
    //     el: ".swiper-pagination",
    //     renderBullet: (index, className) => {
    //       return `<span class="${className} custom-bullet"></span>`;
    //     },
    //   }}
    //   loop={true}
    //   speed={600}
    //   autoplay={{
    //     delay: 3000,
    //     disableOnInteraction: false,
    //   }}
    //   className="expo-swiper"
    // >
    //   {/* {data1.room.Room_Images[0]["url"]} */}

    //   {data.props.room.Room_Images.map((value: string, key: number) => (
    //     <SwiperSlide key={key}>
    //       <div className="relative h-[600px]">
    //         <Image
    //           src={URL + value.url}
    //           alt={key.toString()}
    //           fill
    //           className="object-cover"
    //           sizes="(max-width: 768px) 100vw, 80vw"
    //           priority={key === 0}
    //         />
    //       </div>
    //     </SwiperSlide>
    //   ))}

    //   {/* Custom Navigation */}
    //   <div className="swiper-button-prev custom-nav"></div>
    //   <div className="swiper-button-next custom-nav"></div>

    //   {/* Custom Pagination */}
    //   <div className="swiper-pagination"></div>
    // </Swiper>
  );
};
export { Slider, SliderMobile, Individual_Room_Slider };
