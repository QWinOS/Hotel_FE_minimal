import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-3 text-center text-primary drop-shadow-sm tracking-tight">
        Contact Us
      </h1>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
        We would love to hear from you! Reach out for bookings, questions, or
        feedback. Our team is always ready to assist you and make your stay
        memorable.
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
              href="tel:+911234567890"
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              +91 12345 67890
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
              href="mailto:info@yourhotel.com"
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              info@yourhotel.com
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
              123, Main Street,
              <br />
              City Name, State, 123456, India
            </div>
          </div>
        </div>
      </div>
      {/* Google Map Card below */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-2 border border-gray-200 dark:border-gray-800 flex items-center justify-center h-full min-h-[320px]">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c1234567%3A0xabcdefabcdefabcd!2sYour%20Hotel%20Name!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
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
