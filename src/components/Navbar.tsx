"use client";
import Image from "next/image";
import Link from "next/link";
import favicon from "../app/favicon.ico";
import { useState } from "react";
import { MdOutlineMenu, MdClose, MdFacebook } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
// import ThemeModeToggler from "./ThemeModeToggler";
import "./component.css";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Category", href: "/category" },
  { title: "Gallery", href: "/gallery/1" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const menuVars = {
  initial: {
    x: "100%", // Start completely off-screen to the right
    opacity: 0,
  },
  animate: {
    x: 0, // Slide into view
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%", // Slide out to the right
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      duration: 0.7,
    },
  },
};
const mobileLinkIcon = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    x: 0,
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};
const mobileNavIcon = {
  initial: {
    y: "10vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
};
const desktop = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };
  const MobileNavLink = ({ title, href }: any) => {
    return (
      <motion.div
        // variants={mobileLinkVars}
        className="text-5xl uppercase"
        onClick={handleNav}
      >
        <Link href={href}>{title}</Link>
      </motion.div>
    );
  };
  const DesktopNav = ({ title, href }: any) => {
    return (
      <motion.div className="m-4 text-2xl uppercase">
        <Link className="nav" href={href}>
          {title}
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="bg-white fixed top-0 z-20 h-16 w-full shadow-xl sm:h-20">
      {/* Tab Desktop Navbar */}
      <div className="z-20 flex h-16 w-full items-center justify-between px-4 sm:h-full 2xl:px-16">
        <Link href={"/"}>
          <div className="wrapper">
            <Image
              className="cursor-pointer"
              src={favicon}
              // height={50}
              // width={50}
              fill
              alt="Logo"
              sizes="(max-width: 640) 640w,
                  (max-width: 750) 750w,
                  (max-width: 828) 828w,
                  (max-width: 1080) 1080w,
                  (max-width: 1200) 1200w,
                  (max-width: 1920) 1920w,
                  (max-width: 2048) 2048w,
                  (max-width: 3840) 3840w"
            />
          </div>
        </Link>
        <div className="hidden sm:flex">
          {navLinks.map((link, index) => {
            return (
              <DesktopNav key={index} title={link.title} href={link.href} />
            );
          })}
          <div className="ml-5 self-center text-xl">
            {/* <ThemeModeToggler /> */}
          </div>
        </div>
        <div onClick={handleNav} className="cursor-pointer pl-24 sm:hidden">
          <MdOutlineMenu size={25} />
        </div>
      </div>
      {/* Mobile Navbar */}
      <div className="visible sm:hidden">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-0 h-[100dvh] w-[100dvw] origin-top bg-[#E5EDF1] p-10 dark:bg-[#002349]"
            >
              <div className="flex h-full flex-col">
                <div className="flex w-full ">
                  <motion.div
                    variants={containerVars}
                    initial="initial"
                    animate="open"
                    exit="initial"
                    className="font-lora flex w-full flex-col gap-4 overflow-hidden"
                  >
                    <motion.div
                      variants={{ mobileNavIcon }}
                      className="flex justify-end"
                    >
                      {/* <ThemeModeToggler /> */}
                      <div
                        className="text-md cursor-pointer "
                        onClick={handleNav}
                      >
                        <MdClose size={25} />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="font-lora flex h-full flex-col items-center justify-center gap-4 "
                >
                  {navLinks.map((link, index) => {
                    return (
                      <div className="overflow-hidden" key={index}>
                        <MobileNavLink
                          key={index}
                          title={link.title}
                          href={link.href}
                          onClick={handleNav}
                        />
                      </div>
                    );
                  })}
                  <div className="overflow-hidden">
                    <motion.div
                      //   variants={mobileLinkIcon}
                      className="flex gap-x-8"
                    >
                      <MdFacebook
                        className="text-[#0165E1]"
                        size={50}
                        title="FB"
                      />
                      <AiOutlineInstagram
                        className="text-[#C13584]"
                        size={50}
                      />
                      <AiOutlineTwitter className="text-[#1D9BF0]" size={50} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
