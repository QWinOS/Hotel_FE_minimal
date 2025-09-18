import { getGraphQLOutput } from "@/components/GraphQL";
import Link from "next/link";
import React, { use } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex items-start gap-6">
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-1 text-base">{content}</div>
    </div>
  </div>
);

export default function ContactPage() {
  const contact = use(getGraphQLOutput("contact", "")).props?.contact;
  return (
    <div className="bg-slate-50">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#009688] sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
            {contact?.Description}
          </p>
          <div className="mt-6 h-1 w-24 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 flex flex-col justify-center">
            <Link href={`tel:+91${contact?.Phone}`} passHref>
              <ContactInfo
                icon={<FaPhoneAlt className="text-xl text-amber-500" />}
                title="Phone"
                content={<span>+91 - {contact?.Phone}</span>}
              />
            </Link>
            <Link href={`tel:+91${contact?.Alternate_Phone}`} passHref>
              <ContactInfo
                icon={<FaEnvelope className="text-xl text-amber-500" />}
                title="Email"
                content={contact?.Email}
              />
            </Link>
            <Link href={contact?.Map_URL_Share} target="_blank" passHref>
              <ContactInfo
                icon={<FaMapMarkerAlt className="text-xl text-amber-500" />}
                title="Address"
                content={<p className="text-slate-800">{contact?.Address}</p>}
              />
            </Link>
          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              title="Google Map"
              src={contact?.Map_URL_Embed}
              width="100%"
              height="100%"
              className="min-h-[400px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}
