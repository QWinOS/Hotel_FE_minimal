"use client";

import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SignIn } from "./sign_in_button";

export default function Navbar_old() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  // const { data: session } = useSession();
  const session = null;
  console.log(session);
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="ml-2 md:ml-0">
              <span className="text-xl font-bold text-blue-600">Your Logo</span>
            </Link>
          </div>

          {/* Desktop Navigation (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/features"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Pricing
            </Link>
          </div>

          {/* Right side - Profile Dropdown */}
          {/* <div className="flex items-center"> */}
          {/* {session?.user ? ( */}
          {/* // <div className="relative" ref={profileMenuRef}> */}
          {/* <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:inline text-gray-700 text-sm font-medium">
                    {session.user.name}
                  </span>
                </button> */}

          {/* Profile Dropdown */}
          {/* {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )} */}
          {/* </div> */}
          {/* ) : ( */}
          {/* //   <Link */}
          {/* //     href="/auth/signin" */}
          {/* //     className="text-gray-700 hover:text-blue-600 px-3 py-2" */}
          {/* //   > */}
          {/* // <SignIn /> */}
          {/* // Sign In */}
          {/* //   </Link> */}
          {/* // )} */}
          {/* // </div> */}
          {/* // </div> */}

          {/* Mobile Menu (Slide-down animation) */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden ${
              isMenuOpen ? "max-h-48" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-out`}
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/features"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              {/* {!session?.user && (
              <Link
                href="/auth/signin"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
