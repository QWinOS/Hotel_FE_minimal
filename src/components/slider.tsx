"use client";
import {
  A11y,
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
import { use, useEffect, useRef, useState } from "react";
import { getGraphQLOutput } from "./GraphQL";
import Individual_Room from "./Room";
import Room from "@/app/room/[slug]/page";
import Link from "next/link";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";
const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

interface ProfileImage {
  url: string;
  caption: string;
  alternativeText: string;
}
const Slider = (rooms: any) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const swiperRef = useRef<any>(null);

  return (
    <Swiper
      slidesPerView={3}
      // centeredSlides={true}
      slidesPerGroupSkip={3}
      grabCursor={true}
      centeredSlides={false}
      slidesOffsetBefore={0}
      slidesOffsetAfter={0}
      keyboard={{
        enabled: true,
      }}
      // breakpoints={{
      //   769: {
      //     slidesPerView: 3,
      //     slidesPerGroup: 3,
      //   },
      // }}
      scrollbar={false}
      // navigation={true}
      // navigation={{
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // }}
      navigation={{
        prevEl,
        nextEl,
        disabledClass: "opacity-30 cursor-default", // Style for disabled state
      }}
      pagination={{
        dynamicBullets: true,
        renderBullet: (index, className) => {
          return `<span class="${className} custom-bullet w-2 h-2 rounded-full bg-gray-400"></span>`;
        },
      }}
      modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      spaceBetween={30}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
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
          // <SwiperSlide key={id}>
          //   <Link
          //     className="flex flex-col w-full bg-transparent border-none p-0 hover:scale-105 transition-transform"
          //     href={"/room/" + docId}
          //   >
          //     <div className="" key={id}>
          //       <div
          //         style={{
          //           position: "relative",
          //           // height: "300px",
          //           width: "100%",
          //           aspectRatio: "4/3",
          //         }}
          //         // className="mx-5"
          //       >
          //         <Image
          //           src={room_img}
          //           fill
          //           alt={room_Type}
          //           sizes="100vw"
          //           style={{ objectFit: "cover" }}
          //         />
          //       </div>
          //       <div className="border-x border-b border-gray-300 dark:border-white ">
          //         <div className="m-2">
          //           <div className="font-medium line-clamp-1">
          //             <p className="">{room_Type}</p>
          //           </div>
          //           <div className="font-bold">
          //             <p>From &#8377;{price} per night</p>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </Link>
          // </SwiperSlide>
          <SwiperSlide key={id}>
            <Link
              href={"/room/" + docId}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room_img}
                  fill
                  alt={room_Type}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 text-gray-800 dark:text-white">
                  {room_Type}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                  {description}
                </p>
                <p className="font-bold text-primary mt-2">
                  From ₹{price} per night
                </p>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}

      {/* <button
        ref={(node) => setPrevEl(node)}
        
        className="absolute top-1/2 ml-2 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-gray-800 text-4xl" />
      </button>

      <button
        ref={(node) => setNextEl(node)}
        className="absolute top-1/2 mr-2 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-md hover:bg-opacity-100 transition-all duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-gray-800 text-2xl" />
      </button> */}

      <button
        ref={(node) => setPrevEl(node)}
        className="absolute top-1/2 ml-10 -left-4 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaArrowAltCircleLeft className="text-gray-800 text-4xl" />
      </button>

      <button
        ref={(node) => setNextEl(node)}
        className="absolute top-1/2 mr-10 -right-4 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
        aria-label="Next slide"
      >
        <FaArrowAltCircleRight className="text-gray-800 text-4xl" />
      </button>
    </Swiper>
  );
};

const SliderMobile = (rooms: any) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={16}
      grabCursor={true}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      modules={[Keyboard, Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {Object.keys(rooms.props).map((room: unknown, id: number) => {
        const roomData = rooms.props[id];
        let room_Type = roomData?.Room_Type;
        let description = roomData?.Description[0].children[0].text;
        let room_img = roomData?.Room_Images[0].url;
        let price = roomData?.Price;
        return (
          <SwiperSlide key={id}>
            <Link href={`/room/${roomData.documentId}`} className="block">
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={URL + roomData.Room_Images[0]?.url}
                  alt={roomData.Room_Type || "Room"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={id === 0}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 flex flex-col items-center backdrop-blur-lg">
                  <h3 className="text-white text-lg font-semibold text-center">
                    {/* {roomData.Room_Type} */}
                  </h3>
                  <div className="font-semibold text-center">
                    <p className="text-white text-md text-center truncate w-full">
                      {description?.slice(0, 60) || ""}
                      <br />
                      From &#8377;{price} per night
                    </p>
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

// const SliderMobile = (rooms: any) => {
//   return (
//     <Swiper
//       slidesPerView={1}
//       // centeredSlides={true}
//       // slidesPerGroupSkip={1}
//       grabCursor={true}
//       keyboard={{
//         enabled: true,
//       }}
//       breakpoints={{
//         769: {
//           slidesPerView: 1,
//           slidesPerGroup: 1,
//         },
//       }}
//       scrollbar={false}
//       navigation={true}
//       pagination={{
//         // clickable: false,
//         dynamicBullets: true,
//       }}
//       modules={[Keyboard, Scrollbar, Navigation]}
//       spaceBetween={5}
//       className="mySwiper"
//     >
//       {Object.keys(rooms.props).map((room: unknown, id: number) => {
//         let room_Type = rooms.props[id].Room_Type;
//         let description = rooms.props[id].Description[0].children[0].text;
//         let room_img = rooms.props[id].Room_Images[0].url;
//         let price = rooms.props[id].Price;

//         room_img = URL + room_img;
//         // console.log(rooms.props[id] + " " + id);
//         return (
//           <SwiperSlide key={id}>
//             <Link
//               href={"/room/" + rooms.props[id].documentId}
//               className="flex flex-col w-full bg-transparent border-none p-0 hover:scale-105 transition-transform"
//               type="button"
//               // onClick={() => {
//               //   console.log("HIT");
//               // }}
//             >
//               <div className="" key={id}>
//                 <div
//                   style={{
//                     position: "relative",
//                     // height: "300px",
//                     width: "100%",
//                     aspectRatio: "4/3",
//                   }}
//                 >
//                   <Image
//                     src={room_img}
//                     fill
//                     alt={room_Type}
//                     sizes="100vw"
//                     style={{ objectFit: "cover" }}
//                     className="rounded-t-xl"
//                   />
//                 </div>
//                 <div className=" flex border-2 border-gray-300 dark:border-white rounded-b-xl justify-center">
//                   <div className="flex flex-col mt-3 mb-3">
//                     <div className="font-medium line-clamp-1">
//                       <p className="">{room_Type}</p>
//                     </div>
//                     <div className="font-bold text-center">
//                       <p>From &#8377;{price} per night</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

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
export const Individual_Room_Slider = ({ props }: { props: any }) => {
  console.log(props);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const swiperRef = useRef<any>(null);
  const galleryId = "room-photoswipe-gallery";

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <div id={galleryId} className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, EffectCreative, Autoplay]}
        effect="creative"
        creativeEffect={{
          prev: { shadow: true, translate: ["-20%", 0, -1] },
          next: { translate: ["100%", 0, 0] },
        }}
        // navigation
        navigation={{
          prevEl,
          nextEl,
          disabledClass: "opacity-30 cursor-default", // Style for disabled state
        }}
        pagination={{
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet w-2 h-2 rounded-full bg-gray-400"></span>`;
          },
        }}
        loop
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="sm:rounded-2xl mySwiper"
      >
        {props.map((img: any, idx: number) => (
          <SwiperSlide key={idx}>
            <a
              href={URL + img.url}
              data-pswp-width={img.width || 1200}
              data-pswp-height={img.height || 800}
              // No target="_blank" or rel
            >
              <div className="relative h-[300px] sm:h-[600px]">
                <Image
                  src={URL + img.url}
                  alt={`Room image ${idx + 1}`}
                  fill
                  className="object-cover sm:rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={idx === 0}
                />
              </div>
            </a>
          </SwiperSlide>
        ))}{" "}
        <button
          ref={(node) => setPrevEl(node)}
          className="absolute top-1/2 ml-10 -left-4 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaArrowAltCircleLeft className="text-gray-800 text-4xl" />
        </button>
        <button
          ref={(node) => setNextEl(node)}
          className="absolute top-1/2 mr-10 -right-4 z-10 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaArrowAltCircleRight className="text-gray-800 text-4xl" />
        </button>
      </Swiper>
    </div>
  );
};

export const About_Our_Team_Slider = ({ props }: { props: any }) => {
  console.log(props);
  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1.5} // Show 1 full and a bit of the next/prev
          centeredSlides={true}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true, hide: true }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
            },
          }}
          autoplay
          className="myTeamSwiper py-8" // Added padding for pagination/navigation
        >
          {props.map((picture: ProfileImage, index: number) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mb-4">
                <Image
                  src={URL + picture.url}
                  alt={picture.alternativeText || `Team member ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              {picture.caption && (
                <p className="font-semibold text-lg w-48 sm:w-56 md:w-64">
                  {picture.caption}
                  <br />
                  {picture.alternativeText}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export { Slider, SliderMobile };
