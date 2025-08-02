"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MdOutlineMenu, MdClose, MdFacebook } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import favicon from "../app/favicon.ico";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Rooms", href: "/room" },
  { title: "Gallery", href: "/gallery/1" },
  { title: "Dinning", href: "/dinning" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const menuVars: Variants = {
    initial: { x: "100%" },
    animate: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 shadow-md backdrop-blur-lg border-b border-slate-200/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-12">
            <Image
              src={favicon}
              alt="Hotel Logo"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-slate-800 hidden sm:block">
            Sweet Home
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="px-4 py-2 text-slate-600 font-medium rounded-md transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={handleNav} aria-label="Open menu">
            <MdOutlineMenu size={28} className="text-slate-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 h-screen w-screen bg-slate-800/50 backdrop-blur-lg md:hidden"
          >
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl">
              <div className="flex justify-end p-4">
                <button onClick={handleNav} aria-label="Close menu">
                  <MdClose size={28} className="text-slate-800" />
                </button>
              </div>
              <nav className="flex flex-col items-center gap-6 p-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={handleNav}
                    className="w-full text-center text-xl font-semibold text-slate-700 py-3 rounded-lg transition-colors hover:bg-slate-100"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-8 left-0 w-full">
                <div className="flex justify-center gap-6">
                  <SocialIcon href="https://facebook.com" aria-label="Facebook">
                    <MdFacebook size={24} />
                  </SocialIcon>
                  <SocialIcon
                    href="https://instagram.com"
                    aria-label="Instagram"
                  >
                    <AiOutlineInstagram size={24} />
                  </SocialIcon>
                  <SocialIcon href="https://twitter.com" aria-label="Twitter">
                    <AiOutlineTwitter size={24} />
                  </SocialIcon>
                </div>
                <p className="mt-6 text-center text-xs text-slate-500">
                  &copy; {new Date().getFullYear()} Hotel Sweet Home
                  International
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const SocialIcon = ({
  href,
  "aria-label": ariaLabel,
  children,
}: {
  href: string;
  "aria-label": string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-slate-500 transition-colors hover:text-amber-500"
  >
    {children}
  </a>
);
