import { getGraphQLOutput } from "@/components/GraphQL";
import React, { use } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const contact = use(getGraphQLOutput("contact", "")).props?.contact;
  return (
    <div className="max-w-4xl mx-4 sm:mx-auto sm:px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-3 text-center text-primary drop-shadow-sm tracking-tight">
        Contact Us
      </h1>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
        {contact?.Description}
      </p>
      {/* Contact Details Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-800 mb-10">
        <div className="flex items-center gap-4">
          <span className="bg-primary/10 text-primary p-3 rounded-full">
            <FaPhoneAlt className="text-xl" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-gray-200 font-semibold">
              Phone
            </div>
            <a
              href={`tel:+91${contact?.Phone}`}
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              +91-{contact?.Phone}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/10 text-primary p-3 rounded-full">
            <FaEnvelope className="text-xl" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-gray-200 font-semibold">
              Email
            </div>
            <a
              href={`mailto:${contact?.Email}`}
              className="text-blue-600 hover:underline text-base font-medium leading-relaxed"
            >
              {contact?.Email}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="bg-primary/10 text-primary p-3 rounded-full mt-1">
            <FaMapMarkerAlt className="text-xl" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-gray-200 font-semibold">
              Address
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              {contact?.Address}
            </div>
          </div>
        </div>
      </div>
      {/* Google Map Card below */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-2 border border-gray-200 dark:border-gray-800 flex items-center justify-center h-full min-h-[320px]">
        <iframe
          title="Google Map"
          src={contact?.Map_URL}
          width="100%"
          height="100%"
          className="rounded-xl min-h-[300px] h-[320px] w-full border-none shadow-md"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
