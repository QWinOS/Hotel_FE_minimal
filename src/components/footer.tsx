import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer
      className="
        flex items-center justify-center bg-gray-800 text-white py-6
    "
    >
      <div className="text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Sweet Home International. All rights
          reserved.
        </p>
        <div className="mt-2 text-xs space-x-4">
          <Link href="/terms-and-conditions" className="hover:text-gray-300">
            Privacy Policy & Terms
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <a
            href="https://www.facebook.com/hotelsweethomeinternational"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          {/* <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a> */}
          <a
            href="https://www.instagram.com/hotelsweethomeinternational"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          {/* <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
