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
        <section className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">
            {about?.Meet_Our_Team_Title}
          </h2>
          <About_Our_Team_Slider props={about?.Meet_Our_Team_Pictures} />
        </section>
      </main>
    </div>
  );
}
