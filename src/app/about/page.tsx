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
  // console.log(about);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] w-full">
        <Image
          src={`${URL}${about?.Title_Background?.url}`}
          alt={about?.About_Title || "About Us"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-center drop-shadow-lg">
            {about?.About_Title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
            {about?.Our_Story_Title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            {about?.Our_Story}
          </p>
        </section>

        {/* Center Image Slider Section */}
        <section className="mb-16">
          <Individual_Room_Slider props={about?.Center_Images} />
        </section>

        {/* Second Paragraph Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
            {about?.Second_Paragraph_Title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            {about?.Second_Paragraph_Body}
          </p>
        </section>

        {/* Meet Our Team Section */}
        {/* <section className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">
            {about?.Meet_Our_Team_Title}
          </h2>
          <About_Our_Team_Slider props={about?.Meet_Our_Team_Pictures} />
        </section> */}

        {/* Testimonials Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-12 text-center">
            {about?.Testimonials_Title || "What Our Guests Say"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about?.Testimonial?.map((testimonial: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="flex-grow">
                  <div className="flex mb-4">
                    <svg
                      className="w-10 h-10 text-slate-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.Content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">
                      {testimonial.Author_Name}
                    </p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.Rating
                            ? "text-yellow-500"
                            : "text-slate-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
